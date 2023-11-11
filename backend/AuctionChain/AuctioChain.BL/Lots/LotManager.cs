using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Lot;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Lots;

public class LotManager : ILotManager
{
    private readonly DataContext _context;

    public LotManager(DataContext context)
    {
        _context = context;
    }

    public Task<Result<IEnumerable<LotDal>>> GetByIdAsync(Guid auctionId)
    {
        var lots = (IEnumerable<LotDal>) _context.Lots.Include(f => f.Bets).Where(lot => lot.AuctionId == auctionId);
        return Task.FromResult(Result.Ok(lots));
    }

    public async Task<Result> CreateAsync(LotDal model)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(i => i.Id == model.AuctionId);
        if (auction is null)
            return Result.Fail("Аукцион с переданным идентификатором не найден");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");

        var lot = new LotDal(model.AuctionId, model.Name, model.Description, model.Code, model.BetStep,
            model.BuyoutPrice);

        await _context.Lots.AddAsync(lot);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        var lot = await _context.Lots.Include(l => l.Auction).FirstOrDefaultAsync(lo => lo.Id == id);
        if (lot is null)
            return Result.Ok();

        var auction = lot.Auction;
        if (auction is null || !auction.IsEditable)
            return Result.Fail("Данный лот нельзя удалить");

        _context.Lots.Remove(lot);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> UpdateAsync(LotDal model)
    {
        var lot = await _context.Lots.Include(c => c.Auction).FirstOrDefaultAsync(l => l.Id == model.Id);

        if (lot is null)
            return Result.Fail("Данный лот не найден");

        if (lot.Auction is null || !lot.Auction.IsEditable)
            return Result.Fail("Нельзя обновить данный лот, т.к. для ауцкиона запрещено редактирование");
        
        if (lot.IsPurchased)
            return Result.Fail("По данному лоту запрещено делать ставки, т.к. он выкуплен");

        lot.Name = model.Name;
        lot.Code = model.Code;
        lot.Description = model.Description;
        lot.BetStep = model.BetStep;
        lot.BuyoutPrice = model.BuyoutPrice;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}