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

    public Task<Result<IEnumerable<Lot>>> GetByIdAsync(Guid id)
    {
        var lots = (IEnumerable<Lot>) _context.Lots.Where(lot => lot.AuctionId == id);
        return Task.FromResult(Result.Ok(lots));
    }

    public async Task<Result> CreateAsync(Lot model)
    {
        await _context.Lots.AddAsync(model);
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

    public async Task<Result> UpdateAsync(Lot model)
    {
        throw new Exception();
    }
}