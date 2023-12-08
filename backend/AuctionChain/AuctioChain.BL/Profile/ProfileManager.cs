using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction.Dto;
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
        var user = await _context.Users.Include(i => i.MyAuctions).FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var auctions = user.MyAuctions;
        
        var response = new GetProfileResponse
        {
            UserName = user.UserName!,
            Balance = user.Balance,
            UserAuctions = auctions.Select(auc => _mapper.Map<AuctionResponse>(auc)),
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