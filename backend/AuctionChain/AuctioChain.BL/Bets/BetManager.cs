using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Bet;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Bets;

public class BetManager : IBetManager
{
    private readonly DataContext _context;

    public BetManager(DataContext context)
    {
        _context = context;
    }

    public async Task<Result> CreateAsync(Guid lotId, Guid userId, decimal? amount)
    {
        var lot = await _context.Lots
            .Include(l => l.Auction)
            .Include(l => l.Bets)
            .FirstOrDefaultAsync(l => l.Id == lotId);
        
        if (lot is null)
            return Result.Fail("Лот не найден");
        
        if (lot.Auction is null)
            return Result.Fail("Аукцион не найден");

        if (!lot.Auction.IsEditable)
            return Result.Fail("Нельзя обновить данный лот, т.к. для ауцкиона запрещено редактирование");
        
        if (lot.IsPurchased)
            return Result.Fail("По данному лоту запрещено делать ставки, т.к. он выкуплен");

        if (amount is not null && lot.Bets.Count > 0 && amount < lot.Bets.Max(b => b.Amount) + lot.BetStep ||
            amount is not null && lot.Bets.Count > 0 && amount <= lot.Bets.Max(b => b.Amount)) 
            return Result.Fail("Ставка должна быть больше");

        decimal nextStep;
        if (amount is null)
            nextStep = lot.Bets.Count > 0
                ? lot.Bets.Max(b => b.Amount) + lot.BetStep
                : lot.BetStep;
        else
            nextStep = (decimal) amount;

        var bet = new BetDal(userId, lotId, nextStep);
        await _context.Bets.AddAsync(bet);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result<IEnumerable<BetDal>>> GetBetsByLotAsync(Guid lotId)
    {
        var lot = await _context.Lots.Include(b => b.Bets).FirstOrDefaultAsync(l => l.Id == lotId);
        if (lot is null)
            return Result.Fail("Лот не найден");
        
        if (lot.Bets.Count == 0)
            return Result.Fail("Ставок на лот еще нет");

        return Result.Ok((IEnumerable<BetDal>) lot.Bets);
    }
}