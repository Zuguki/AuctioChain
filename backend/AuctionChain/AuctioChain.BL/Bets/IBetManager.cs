using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Bet;
using FluentResults;

namespace AuctioChain.BL.Bets;

public interface IBetManager
{
    Task<Result> CreateAsync(Guid lotId, Guid userId, decimal? amount);

    Task<Result<IEnumerable<BetDal>>> GetBetsByLotAsync(Guid lotId);
}