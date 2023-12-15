using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Lot.Dto;
using AuctioChain.DAL.Models.Pagination;
using AuctioChain.DAL.Models.Profile.Dto;
using AutoMapper;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Profile;

public class ProfileManager : IProfileManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ProfileManager(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Result<GetProfileResponse>> GetProfileByUserIdAsync(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");
        
        var response = new GetProfileResponse
        {
            UserName = user.UserName!,
        };
        
        return response;
    }

    public async Task<Result<GetUserBalanceResponse>> GetUserBalanceAsync(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        return new GetUserBalanceResponse {Balance = user.Balance};
    }

    public async Task<Result<(GetUserAuctionsResponse, PaginationMetadata)>> GetUserAuctionsAsync(GetUserAuctionsRequest request)
    {
        var user = await _context.Users
            .Include(i => i.MyAuctions)
            .FirstOrDefaultAsync(app => app.Id == request.UserId);
        
        if (user is null)
            return Result.Fail("Пользователь не найден");
        
        var auctions = user.MyAuctions;
        var paginationMetadata = new PaginationMetadata(auctions.Count, request.Page, request.ItemsPerPage);
        var result = auctions
            .Skip((request.Page - 1) * request.ItemsPerPage)
            .Take(request.ItemsPerPage);

        var response = new GetUserAuctionsResponse { Auctions = result.Select(auc => _mapper.Map<AuctionResponse>(auc)) };
        return (response, paginationMetadata);
    }

    public async Task<Result<(GetWinLotsOfUserResponse, PaginationMetadata)>> GetWinLotsOfUserAsync(GetWinLotsOfUserRequest request)
    {
        var user = await _context.Users
            .Include(applicationUser => applicationUser.AllBets)
            .ThenInclude(betDal => betDal.Lot!).ThenInclude(lotDal => lotDal.Auction)
            .Include(applicationUser => applicationUser.AllBets).ThenInclude(betDal => betDal.Lot!)
            .ThenInclude(lotDal => lotDal.Bets)
            .FirstOrDefaultAsync(app => app.Id == request.UserId);
        
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var winLots = user.AllBets
            .Select(bet => bet.Lot!)
            .Distinct()
            .Where(lot => lot.Auction.Status == AuctionStatus.Complete && lot.Bets.Last().UserId == request.UserId)
            .ToList();
        var paginationMetadata = new PaginationMetadata(winLots.Count, request.Page, request.ItemsPerPage);
        var result = winLots
            .Skip((request.Page - 1) * request.ItemsPerPage)
            .Take(request.ItemsPerPage);
        
        var response = new GetWinLotsOfUserResponse { WinLots = result.Select(lot => _mapper.Map<WinLotResponse>(lot)) };
        return (response, paginationMetadata);
    }

    public async Task<Result<(GetUserActiveLotsResponse, PaginationMetadata)>> GetUserActiveLotsAsync(GetUserActiveLotsRequest request)
    {
        var user = await _context.Users
            .Include(applicationUser => applicationUser.AllBets)
            .ThenInclude(betDal => betDal.Lot)
            .ThenInclude(lotDal => lotDal.Auction)
            .FirstOrDefaultAsync(app => app.Id == request.UserId);
        
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var activeLots = user.AllBets
            .Select(bet => bet.Lot)
            .Distinct()
            .Where(lot => lot.Auction.Status == AuctionStatus.Bidding)
            .ToList();
        var paginationMetadata = new PaginationMetadata(activeLots.Count, request.Page, request.ItemsPerPage);
        var result = activeLots
            .Skip((request.Page - 1) * request.ItemsPerPage)
            .Take(request.ItemsPerPage);
        
        var response = new GetUserActiveLotsResponse { ActiveLots = result.Select(lot => _mapper.Map<LotResponse>(lot)) };
        return (response, paginationMetadata);
    }
}