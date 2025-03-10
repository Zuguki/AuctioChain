﻿using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Bet;
using AuctioChain.DAL.Models.Bet.Dto;
using AuctioChain.DAL.Models.Pagination;
using AutoMapper;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Bets;

public class BetManager : IBetManager
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public BetManager(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Result> CreateAsync(DoBetRequest request, Guid userId)
    {
        var lot = await _context.Lots
            .Include(l => l.Auction)
            .Include(l => l.Bets).ThenInclude(betDal => betDal.User)
            .FirstOrDefaultAsync(l => l.Id == request.LotId);

        var user = await _context.Users.FirstAsync(appUser => appUser.Id == userId);
        
        if (lot is null)
            return Result.Fail("Лот не найден");
        
        if (lot.Auction is null)
            return Result.Fail("Аукцион не найден");

        if (lot.Auction.UserId == userId)
            return Result.Fail("Вы не можете поставить ставку на свой же лот");

        if (lot.Auction.Status != AuctionStatus.Bidding)
            return Result.Fail("Нельзя обновить данный лот, т.к. для ауцкиона запрещено редактирование");
        
        if (request.Amount is not null && lot.Bets.Count > 0 && request.Amount < lot.Bets.Max(b => b.Amount) + lot.BetStep ||
            request.Amount is not null && lot.Bets.Count == 0 && request.Amount < lot.InitialPrice)
            return Result.Fail("Ставка должна быть больше");

        var maxBet = lot.Bets.Count > 0 ? lot.Bets.Last() : null;
        decimal nextStep;
        if (request.Amount is null)
            nextStep = maxBet is not null
                ? maxBet.Amount + lot.BetStep
                : lot.InitialPrice;
        else
            nextStep = (decimal) request.Amount;

        if (nextStep > user.Balance)
            return Result.Fail("У вас недостаточно средств");
        
        var previewUser = maxBet is not null
            ? lot.Bets.MaxBy(b => b.Amount)?.User
            : null;

        if (previewUser is not null)
            previewUser.Balance += maxBet!.Amount;
        
        var bet = new BetDal(userId, request.LotId, nextStep);
        user.Balance -= nextStep;
        await _context.Bets.AddAsync(bet);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result<(GetBetsByLotResponse, PaginationMetadata)>> GetBetsByLotAsync(GetBetsByLotRequest request,
        PaginationRequest pagination)
    {
        var lot = await _context.Lots.Include(b => b.Bets).FirstOrDefaultAsync(l => l.Id == request.LotId);
        if (lot is null)
            return Result.Fail("Лот не найден");

        if (lot.Bets.Count == 0)
            return Result.Fail("Ставок на лот еще нет");

        var metadata = new PaginationMetadata(lot.Bets.Count, pagination.Page, pagination.ItemsPerPage);
        
        var result = lot.Bets
            .Skip((pagination.Page - 1) * pagination.ItemsPerPage)
            .Take(pagination.ItemsPerPage);
        var response = new GetBetsByLotResponse {Bets = result.Select(b => _mapper.Map<BetResponse>(b))};
        return Result.Ok((response, metadata));
    }
}