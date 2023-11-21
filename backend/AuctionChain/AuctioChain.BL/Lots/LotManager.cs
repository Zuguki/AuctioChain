using System;
using System.Collections.Generic;
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
        var lot = await _context.Lots.FirstOrDefaultAsync(l => l.Id == request);
        if (lot is null)
            return Result.Fail("Лот не найден");

        var response = _mapper.Map<LotResponse>(lot);
        return Result.Ok(response);
    }

    public async Task<Result> CreateAsync(CreateLotRequest request)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(i => i.Id == request.AuctionId);
        if (auction is null)
            return Result.Fail("Аукцион с переданным идентификатором не найден");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");

        var lot = new LotDal(request.AuctionId, request.Name, request.Description, request.Code, request.BetStep,
            request.BuyoutPrice);

        await _context.Lots.AddAsync(lot);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> DeleteAsync(DeleteLotRequest request)
    {
        var lot = await _context.Lots.Include(l => l.Auction).FirstOrDefaultAsync(lo => lo.Id == request.LotId);
        if (lot is null)
            return Result.Ok();

        var auction = lot.Auction;
        if (auction is null || !auction.IsEditable)
            return Result.Fail("Данный лот нельзя удалить");

        _context.Lots.Remove(lot);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> UpdateAsync(UpdateLotRequest request)
    {
        var lot = await _context.Lots.Include(c => c.Auction).FirstOrDefaultAsync(l => l.Id == request.LotId);

        if (lot is null)
            return Result.Fail("Данный лот не найден");

        if (lot.Auction is null || !lot.Auction.IsEditable)
            return Result.Fail("Нельзя обновить данный лот, т.к. для ауцкиона запрещено редактирование");
        
        if (lot.IsPurchased)
            return Result.Fail("По данному лоту запрещено делать ставки, т.к. он выкуплен");

        lot.Name = request.Name;
        lot.Code = request.Code;
        lot.Description = request.Description;
        lot.BetStep = request.BetStep;
        lot.BuyoutPrice = request.BuyoutPrice;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}