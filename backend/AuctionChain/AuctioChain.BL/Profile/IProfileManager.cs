using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Profile.Dto;
using FluentResults;

namespace AuctioChain.BL.Profile;

public interface IProfileManager
{
    Task<Result<GetProfileResponse>> GetProfileByUserIdAsync(Guid userId);

    Task<Result<GetUserBalanceResponse>> GetUserBalanceAsync(Guid userId);

    Task<Result<GetUserAuctionsResponse>> GetUserAuctionsAsync(Guid userId);

    Task<Result<GetWinLotsOfUserResponse>> GetWinLotsOfUserAsync(Guid userId);

    Task<Result<GetUserActiveLotsResponse>> GetUserActiveLotsAsync(Guid userId);
}