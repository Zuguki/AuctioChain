﻿using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Lot;
using AuctioChain.DAL.Models.Lot.Dto;
using AuctioChain.DAL.Models.Pagination;
using AutoMapper;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Lots;

public class LotManager : ILotManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    /// <summary>
    /// .ctor
    /// </summary>
    public LotManager(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public Task<Result<(GetLotsResponse, PaginationMetadata)>> GetByIdAsync(GetLotsRequest request, PaginationRequest pagination)
    {
        var lots = _context.Lots.Include(f => f.Bets)
            .Where(lot => lot.AuctionId == request.AuctionId).ToList();
        
        var metadata = new PaginationMetadata(lots.Count, pagination.Page, pagination.ItemsPerPage);

        var result = lots
            .Skip((pagination.Page - 1) * pagination.ItemsPerPage)
            .Take(pagination.ItemsPerPage);
        var response = new GetLotsResponse {Lots = result.Select(l => _mapper.Map<LotResponse>(l))};
        return Task.FromResult(Result.Ok((response, metadata)));
    }

    public async Task<Result<LotResponse>> GetLotByIdAsync(Guid request)
    {
        var lot = await _context.Lots
            .Include(l => l.Bets)
            .FirstOrDefaultAsync(l => l.Id == request);
        if (lot is null)
            return Result.Fail("Лот не найден");

        var response = _mapper.Map<LotResponse>(lot);
        return Result.Ok(response);
    }

    public async Task<Result> CreateAsync(CreateLotRequest request, Guid userId)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(i => i.Id == request.AuctionId);

        if (auction is null)
            return Result.Fail("Аукцион с переданным идентификатором не найден");
        
        if (auction.UserId != userId)
            return Result.Fail("Данный аукцион нельзя редактировать");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");

        var lot = new LotDal(request.AuctionId, request.Name, request.Description, request.InitialPrice,
            request.BetStep, request.Image);

        await _context.Lots.AddAsync(lot);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> DeleteAsync(DeleteLotRequest request, Guid userId)
    {
        var lot = await _context.Lots.Include(l => l.Auction).FirstOrDefaultAsync(lo => lo.Id == request.LotId);
        
        if (lot is null)
            return Result.Ok();

        var auction = lot.Auction;
        if (auction is null || !auction.IsEditable || auction.UserId != userId)
            return Result.Fail("Данный лот нельзя удалить");

        _context.Lots.Remove(lot);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> UpdateAsync(UpdateLotRequest request, Guid userId)
    {
        var lot = await _context.Lots.Include(c => c.Auction).FirstOrDefaultAsync(l => l.Id == request.LotId);

        if (lot is null)
            return Result.Fail("Данный лот не найден");
        
        if (lot.Auction is not null && lot.Auction.UserId != userId)
            return Result.Fail("Данный аукцион нельзя редактировать");

        if (lot.Auction is null || !lot.Auction.IsEditable)
            return Result.Fail("Нельзя обновить данный лот, т.к. для ауцкиона запрещено редактирование");
        
        lot.Name = request.Name;
        lot.Description = request.Description;
        lot.InitialPrice = request.InitialPrice;
        lot.BetStep = request.BetStep;
        lot.Image = request.Image;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}