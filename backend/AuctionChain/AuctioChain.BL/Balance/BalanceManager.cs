using System;
using System.Threading.Tasks;
using AuctioChain.BL.Publishers;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.MQ.Blockchain.Dto;
using AuctioChain.MQ.Blockchain.Functions;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Nethereum.Web3;

namespace AuctioChain.BL.Balance;

public class BalanceManager : IBalanceManager
{
    private readonly IBlockchainPublisher<CheckBalanceReplenishmentDto> _publisher;
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Web3 _web3;

    public BalanceManager(IBlockchainPublisher<CheckBalanceReplenishmentDto> publisher, DataContext context, IConfiguration configuration)
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
            StartBalanceInBlockchain = currentBalance.Result,
            DateSend = DateTime.UtcNow
        };

        await _publisher.Publish("topic", "blockchain.events", "blockchain.balance.updated", dto);
        return Result.Ok();
    }

    public async Task<Result> AddCashToBalanceAsync(Guid userId, decimal value)
    {
        var user = await _context.Users.FirstOrDefaultAsync(app => app.Id == userId);
        if (user is null)
            return Result.Fail("Пользователь не найден");

        user.Balance += value;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}