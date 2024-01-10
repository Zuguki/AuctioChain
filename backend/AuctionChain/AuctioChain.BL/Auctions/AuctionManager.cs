using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
using AuctioChain.BL.Publishers;
using AuctioChain.BL.Services.Dto;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Lot;
using AuctioChain.DAL.Models.Pagination;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace AuctioChain.BL.Auctions;

/// <inheritdoc />
public class AuctionManager : IAuctionManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IBalanceManager _balanceManager;
    private readonly IPublisher<AuctionEndDto> _publisher;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionManager(DataContext context, IMapper mapper, IBalanceManager balanceManager, IPublisher<AuctionEndDto> publisher)
    {
        _context = context;
        _mapper = mapper;
        _balanceManager = balanceManager;
        _publisher = publisher;
    }

    /// <inheritdoc />
    public async Task<Result<(GetAuctionsResponse, PaginationMetadata)>> GetAllAsync(PaginationRequest pagination, GetAuctionsRequest request)
    {
        var auctions = _context.Auctions.Include(a => a.Lots).AsEnumerable();
        var paginationMetadata = new PaginationMetadata(auctions.Count(), pagination.Page, pagination.ItemsPerPage);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var searchLower = request.Search.ToLower();
            auctions = auctions.Where(auc => auc.Name != null && auc.Name.ToLower().Contains(searchLower));
        }
        
        if (request.Status is not null)
            auctions = auctions.Where(auc => (int) auc.Status == (int) request.Status);

        var result = auctions
            .OrderBy(auc => auc.Name)
            .Skip((pagination.Page - 1) * pagination.ItemsPerPage)
            .Take(pagination.ItemsPerPage);
        
        var response = new GetAuctionsResponse {Auctions = result.Select(a => _mapper.Map<AuctionResponse>(a))};
        return Result.Ok((response, paginationMetadata));
    }

    /// <inheritdoc />
    public async Task<Result<GetAuctionByIdResponse>> GetByIdAsync(Guid request)
    {
        var auction = await _context.Auctions.Include(a => a.Lots)
            .FirstOrDefaultAsync(auc => auc.Id == request);
        if (auction is null)
            return Result.Fail("Аукцион не найден");

        var response = _mapper.Map<GetAuctionByIdResponse>(auction);
        return Result.Ok(response);
    }

    /// <inheritdoc />
    public async Task<Result<CreateAuctionResponse>> CreateAsync(CreateAuctionRequest model, Guid userId)
    {
        var auctionWithSameName = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Name == model.Name);
        if (auctionWithSameName is not null)
            return Result.Fail("Аукцион с таким названием уже существует");
        
        var auction = new AuctionDal(model.Name!, userId, model.DateStart, model.DateEnd, model.Description, model.Image);

        var dto = new AuctionEndDto
        {
            Id = auction.Id,
            UserId = auction.UserId,
            DateEnd = auction.DateEnd,
        };

        await _publisher.Publish("topic", "auction.events", "auction.check-end", dto);
        await _context.Auctions.AddAsync(auction);
        await _context.SaveChangesAsync();
        return Result.Ok(new CreateAuctionResponse {AuctionId = auction.Id});
    }

    /// <inheritdoc />
    public async Task<Result> AuctionEndAsync(AuctionEndDto model)
    {
        var auction = await _context.Auctions
            .Include(auc => auc.Lots)
            .FirstOrDefaultAsync(auc => auc.Id == model.Id);
        
        if (auction is null || auction.Status != AuctionStatus.Complete)
            return Result.Ok();

        if (auction.Lots is null || auction.Lots.Count == 0)
            return Result.Ok();
        
        auction = await _context.Auctions
            .Include(auc => auc.Lots)!
            .ThenInclude(lot => lot.Bets)
            .FirstAsync(auc => auc.Id == model.Id);

        foreach (var lot in auction.Lots!)
        {
            var bet = lot.Bets.LastOrDefault();
            if (bet is null)
                continue;

            var winner = await _context.Users
                .Include(applicationUser => applicationUser.WinLots)
                .FirstOrDefaultAsync(app => app.Id == bet.UserId);
            
            if (winner is null || winner.WinLots.Contains(lot))
                continue;
            
            winner.WinLots.Add(lot);
            await _balanceManager.AddCashToBalanceAsync(auction.UserId, bet.Amount);
        }

        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> DeleteAsync(Guid request, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request);

        if (auction is null)
            return Result.Ok();
        
        if (auction.UserId != userId)
            return Result.Fail("У вас нет доступа к редактированию данного аукциона");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя удалить");
        
        _context.Auctions.Remove(auction);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> UpdateAsync(UpdateAuctionRequest model, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == model.AuctionId);
        
        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (auction.UserId != userId)
            return Result.Fail("У вас нет доступа к редактированию данного аукциона");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");
        
        auction.Name = model.Name;
        auction.Description = model.Description;
        auction.Image = model.Image;
        auction.DateStart = model.DateStart;
        auction.DateEnd = model.DateEnd;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> ChangeCreationStateAsync(Guid auctionId, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == auctionId);
        if (auction is null)
            return Result.Fail("Аукцион не найден");

        if (auction.UserId != userId)
            return Result.Fail("У вас нет доступа к редактированию данного аукциона");

        if (!auction.IsEditable)
            return Result.Fail("У данного аукциона нельзя изменить состояние");

        auction.IsCreation = !auction.IsCreation;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> CancelAsync(Guid auctionId, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == auctionId);

        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (auction.UserId != userId)
            return Result.Fail("У вас нет доступа к редактированию данного аукциона");

        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя отменить");

        auction.IsCanceled = true;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}