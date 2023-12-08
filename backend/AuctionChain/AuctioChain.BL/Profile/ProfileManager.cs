using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Lot;
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
        var user = await _context.Users
            .Include(i => i.MyAuctions)
            .Include(i => i.AllBets)
            .ThenInclude(i => i.Lot).ThenInclude(lotDal => lotDal.Auction)
            .Include(applicationUser => applicationUser.AllBets).ThenInclude(betDal => betDal.Lot!)
            .ThenInclude(lotDal => lotDal.Bets)
            .FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var auctions = user.MyAuctions;
        var winLots = user.AllBets
            .Select(bet => bet.Lot!)
            .Distinct()
            .Where(lot => lot.Auction.Status == AuctionStatus.Complete && lot.Bets.Last().UserId == userId)
            .ToList();

        var activeLots = user.AllBets
            .Select(bet => bet.Lot)
            .Distinct()
            .Where(lot => lot.Auction.Status == AuctionStatus.Bidding)
            .ToList();
        
        var response = new GetProfileResponse
        {
            UserName = user.UserName!,
            Balance = user.Balance,
            UserAuctions = auctions.Select(auc => _mapper.Map<AuctionResponse>(auc)),
            WinLots = winLots.Select(lot => _mapper.Map<WinLotResponse>(lot)),
            ParticipateLots = activeLots.Select(lot => _mapper.Map<LotResponse>(lot)),
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