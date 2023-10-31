using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
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
        var lots = (IEnumerable<LotDal>) _context.Lots.Where(lot => lot.AuctionId == auctionId);
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
        var lot = await _context.Lots.FirstOrDefaultAsync(lo => lo!.Id == id);
        if (lot is null)
            return Result.Ok();
        
        _context.Lots.Remove(lot);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> UpdateAsync(LotDal model)
    {
        throw new Exception();
    }
}