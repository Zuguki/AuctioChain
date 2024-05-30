using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
using AuctioChain.BL.Services.Dto;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Admin.Dto;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Pagination;
using AutoMapper;
using FluentResults;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Nest;
using Result = FluentResults.Result;

namespace AuctioChain.BL.Auctions;

/// <inheritdoc />
public class AuctionManager : IAuctionManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IBalanceManager _balanceManager;
    private readonly IPublishEndpoint _publisher;
    private readonly IElasticClient _elastic;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionManager(DataContext context, IMapper mapper, IBalanceManager balanceManager, IPublishEndpoint publisher, IElasticClient elastic)
    {
        _context = context;
        _mapper = mapper;
        _balanceManager = balanceManager;
        _publisher = publisher;
        _elastic = elastic;
    }

    /// <inheritdoc />
    public async Task<Result<(GetAuctionsResponse, PaginationMetadata)>> GetAllAsync(PaginationRequest pagination, GetAuctionsRequest request)
    {
        var auctionsEnumerator = await SearchAuctionsByNameOrAllAsync(request.Search);
        auctionsEnumerator = await FilterAuctionsByStatusAsync(auctionsEnumerator, request.AuctionStatus);
        auctionsEnumerator = await OrderAuctionsByStatusAsync(auctionsEnumerator, request.OrderByStatus);
        
        var auctionsList = auctionsEnumerator.ToList();
        var paginationMetadata = new PaginationMetadata(auctionsList.Count, pagination.Page, pagination.ItemsPerPage);
        auctionsList = auctionsList
            .Skip((pagination.Page - 1) * pagination.ItemsPerPage)
            .Take(pagination.ItemsPerPage).ToList();

        var response = new GetAuctionsResponse {Auctions = auctionsList.Select(a => _mapper.Map<AuctionResponse>(a))};
        return Result.Ok((response, paginationMetadata));
    }

    private Task<IEnumerable<AuctionDal>> OrderAuctionsByStatusAsync(IEnumerable<AuctionDal> auctions,
        OrderByAuctionStatus? orderByStatus)
    {
        if (orderByStatus is not null)
        {
            return Task.FromResult(orderByStatus switch
            {
                OrderByAuctionStatus.Name => auctions.OrderBy(a => a.Name),
                OrderByAuctionStatus.NameDescending => auctions.OrderByDescending(a => a.Name),
                OrderByAuctionStatus.AuctionDateStart => auctions.OrderBy(a => a.DateStart),
                OrderByAuctionStatus.AuctionDateEnd => auctions.OrderBy(a => a.DateEnd),
                _ => auctions
            });
        }

        return Task.FromResult(auctions);
    }

    private async Task<IEnumerable<AuctionDal>> SearchAuctionsByNameOrAllAsync(string? name)
    {
        var auctions = _context.Auctions.Include(a => a.Lots);
        var auctionsList = new List<AuctionDal>();
        
        if (!string.IsNullOrWhiteSpace(name))
        {
            name = name.ToLower();
            var searchResponse = await _elastic.SearchAsync<AuctionIndex>(s => s
                .Query(q => q
                    .Term(t => t.Name, name)));

            foreach (var auc in searchResponse.Documents)
            {
                var auctionDal = await auctions.FirstOrDefaultAsync(item => item.Id == auc.Id);
                if (auctionDal is not null)
                    auctionsList.Add(auctionDal);
            }
        }
        else
            auctionsList = auctions.ToList();

        return auctionsList;
    }

    private Task<IEnumerable<AuctionDal>> FilterAuctionsByStatusAsync(IEnumerable<AuctionDal> auctions, AuctionStatus? status) =>
        Task.FromResult(status is null ? auctions : auctions.Where(auc => (int) auc.Status == (int) status));

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

        var auctionIndex = _mapper.Map<AuctionIndex>(auction);
        await _elastic.IndexDocumentAsync(auctionIndex);
        
        await _publisher.Publish(dto);
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
        
        if (auction is null || (int) auction.Status != (int) AuctionStatus.Complete)
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
    public async Task<Result> CancelAsync(Guid auctionId, Guid userId, bool isMember)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == auctionId);

        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (auction.UserId != userId && isMember)
            return Result.Fail("У вас нет доступа к редактированию данного аукциона");

        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя отменить");

        auction.IsCanceled = true;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> ApproveByIdAsync(Guid auctionId, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == auctionId);

        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя отменить");
        
        if (auction.DateStart < DateTime.UtcNow)
            return Result.Fail("Сначала настройте время так, чтобы аукцион начинался позже");

        auction.IsApproved = true;
        auction.ManagerId = userId;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result<(GetAuctionsResponse, PaginationMetadata)>> GetAllAuctionsForApproveAsync(PaginationRequest pagination)
    {
        var auctionsList = await _context.Auctions.Include(auc => auc.Lots)
            .ToListAsync();
        
        var auctions = auctionsList.Where(auc => (int)auc.Status == (int)AuctionStatus.Moderation).ToList();
        var paginationMetadata = new PaginationMetadata(auctions.Count, pagination.Page, pagination.ItemsPerPage);
        auctions = auctions
            .Skip((pagination.Page - 1) * pagination.ItemsPerPage)
            .Take(pagination.ItemsPerPage).ToList();

        var response = new GetAuctionsResponse {Auctions = auctions.Select(a => _mapper.Map<AuctionResponse>(a))};
        return Result.Ok((response, paginationMetadata));
    }
}