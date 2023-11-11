using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Bet.Dto;
using FluentResults;

namespace AuctioChain.BL.Bets;

public interface IBetManager
{
    Task<Result> CreateAsync(DoBetRequest request, Guid userId);

    Task<Result<GetBetsByLotResponse>> GetBetsByLotAsync(GetBetsByLotRequest request);
}