using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Profile.Dto;
using FluentResults;

namespace AuctioChain.BL.Balance;

public interface IBalanceManager
{
    Task<Result<GetUserBalanceResponse>> GetUserBalanceAsync(Guid userId);

    Task<Result> CheckBalanceReplenishmentAsync(Guid userId, CheckBalanceReplenishmentRequest request);

    Task<Result> AddCashToBalanceAsync(Guid userId, decimal weiValue);
}