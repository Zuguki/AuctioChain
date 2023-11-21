using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Bet.Dto;
using AuctioChain.DAL.Models.Pagination;
using FluentResults;

namespace AuctioChain.BL.Bets;

public interface IBetManager
{
    Task<Result> CreateAsync(DoBetRequest request, Guid userId);

    Task<Result<(GetBetsByLotResponse, PaginationMetadata)>> GetBetsByLotAsync(GetBetsByLotRequest request, PaginationRequest pagination);
}