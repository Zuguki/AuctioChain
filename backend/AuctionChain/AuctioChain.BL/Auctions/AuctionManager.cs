using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AutoMapper;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions;

/// <inheritdoc />
public class AuctionManager : IAuctionManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionManager(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    /// <inheritdoc />
    public Task<Result<GetAuctionsResponse>> GetAllAsync()
    {
        var result = _context.Auctions.Include(a => a.Lots).ToList() as IEnumerable<AuctionDal>;
        
        var response = new GetAuctionsResponse {Auctions = result.Select(a => _mapper.Map<AuctionResponse>(a))};
        return Task.FromResult(Result.Ok(response));
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
    public async Task<Result> CreateAsync(CreateAuctionRequest model, Guid userId)
    {
        var auction = new AuctionDal(model.Name!, userId, model.DateStart, model.DateEnd, model.Description,
            model.Image);

        await _context.Auctions.AddAsync(auction);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> DeleteAsync(Guid request)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request);

        if (auction is null)
            return Result.Ok();
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя удалить");
        
        _context.Auctions.Remove(auction);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> UpdateAsync(UpdateAuctionRequest model)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == model.AuctionId);
        
        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");
        
        auction.Name = model.Name;
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