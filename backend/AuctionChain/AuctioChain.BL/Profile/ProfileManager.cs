using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Lot.Dto;
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

    public async Task<Result<GetProfileResponse>> GetProfileByUserId(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var auctions = await _context.Auctions.Where(auc => auc.UserId == userId).ToListAsync();
        var participateLots = _context.Bets
            .Include(i => i.Lot)
            .Include(i => i.Lot.Auction)
            .Where(bet => bet.UserId == userId)
            .Select(bet => bet.Lot)
            .Distinct()
            .ToList()
            .Where(lot => lot.Auction.Status == AuctionStatus.Bidding);

        var response = new GetProfileResponse
        {
            UserName = user.UserName!,
            Balance = user.Balance,
            UserAuctions = auctions.Select(auc => _mapper.Map<AuctionResponse>(auc)),
            ParticipateLots = participateLots.Select(lot => _mapper.Map<LotResponse>(lot)),
        };
        
        return response;
    }

    public async Task<Result<GetUserBalanceResponse>> GetUserBalance(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        return new GetUserBalanceResponse {Balance = user.Balance};
    }
}