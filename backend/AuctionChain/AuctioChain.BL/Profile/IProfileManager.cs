﻿using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Pagination;
using AuctioChain.DAL.Models.Profile.Dto;
using FluentResults;

namespace AuctioChain.BL.Profile;

public interface IProfileManager
{
    Task<Result<GetProfileResponse>> GetProfileByUserIdAsync(Guid userId);

    Task<Result<(GetUserAuctionsResponse, PaginationMetadata)>> GetUserAuctionsAsync(GetUserAuctionsRequest request);

    Task<Result<(GetWinLotsOfUserResponse, PaginationMetadata)>> GetWinLotsOfUserAsync(GetWinLotsOfUserRequest request);

    Task<Result<(GetUserActiveLotsResponse, PaginationMetadata)>> GetUserActiveLotsAsync(GetUserActiveLotsRequest request);
}