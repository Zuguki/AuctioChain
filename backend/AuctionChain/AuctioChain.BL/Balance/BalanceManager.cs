using System;
using System.Threading.Tasks;
using AuctioChain.BL.Balance.Blockchain.Functions;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Profile.Dto;
using FluentResults;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using Org.BouncyCastle.Math;
using GetUserBalanceOfOutputDTO = AuctioChain.BL.Balance.Blockchain.Dto.GetUserBalanceOfOutputDTO;

namespace AuctioChain.BL.Balance;

public class BalanceManager : IBalanceManager
{
    private readonly IPublishEndpoint _publisher;
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Web3 _web3;

    public BalanceManager(IPublishEndpoint publisher, DataContext context, IConfiguration configuration)
    {
        _publisher = publisher;
        _context = context;
        _configuration = configuration;
        
        var uriToWeb3 = _configuration["Blockchain:Infura:Uri"] + _configuration["Blockchain:Infura:Key"];
        _web3 = new Web3(uriToWeb3);
    }

    public async Task<Result<GetUserBalanceResponse>> GetUserBalanceAsync(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        return new GetUserBalanceResponse {Balance = user.Balance};
    }

    public async Task<Result> CheckBalanceReplenishmentAsync(Guid userId, CheckBalanceReplenishmentRequest request)
    {
        var userBalanceModel = new GetUserBalanceFunction
        {
            UserAddress = request.WalletAddress
        };
        
        var contractAddress = _configuration["Blockchain:SmartContract:Address"];
        var contractFunction = _web3.Eth.GetContractQueryHandler<GetUserBalanceFunction>();
        var currentBalance = await contractFunction.QueryAsync<GetUserBalanceOfOutputDTO>(contractAddress, userBalanceModel);
        var dto = new CheckBalanceReplenishmentDto
        {
            UserId = userId,
            WalletAddress = request.WalletAddress,
            StartBalanceInBlockchain = currentBalance.Balance,
            DateSend = DateTime.UtcNow
        };

        await _publisher.Publish(dto);
        return Result.Ok();
    }

    public async Task<Result> AddCashToBalanceAsync(Guid userId, decimal weiValue)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var auctioChainValue = (decimal) ((double) weiValue / Math.Pow(10, 14));
        user.Balance += auctioChainValue;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> WithdrawAsync(Guid userId, WithdrawCashRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        if (request.AuctioChain >= user.Balance)
            return Result.Fail("Недостаточно средств");
        
        // var weiValue = (double) request.AuctioChain * Math.Pow(10, 14);
        // user.Balance -= request.AuctioChain;
        //
        // var withdrowModel = new WithdrowToFunction
        // {
        //     UserAddress = request.WalletAddress,
        //     Value = (long) weiValue,
        // };
        //
        // var contractAddress = _configuration["Blockchain:SmartContract:Address"];
        //
        // var contractFunction = _web3.Eth.GetContractQueryHandler<WithdrowToFunction>();
        // var currentBalance = await contractFunction.QueryAsync<byte[]>(contractAddress, withdrowModel);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}