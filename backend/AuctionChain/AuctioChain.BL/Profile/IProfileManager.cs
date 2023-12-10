using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Profile.Dto;
using FluentResults;

namespace AuctioChain.BL.Profile;

public interface IProfileManager
{
    Task<Result<GetProfileResponse>> GetProfileByUserIdAsync(Guid userId);

    Task<Result<GetUserBalanceResponse>> GetUserBalanceAsync(Guid userId);
}