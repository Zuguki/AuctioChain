using System;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
using AuctioChain.BL.Balance.Blockchain.Functions;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.MQ.Blockchain.Dto;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Nethereum.Web3;

namespace AuctioChain.BL.Services;

public class BlockchainBalanceConsumer : IConsumer<CheckBalanceReplenishmentDto>
{
    private readonly Web3 _web3;
    private readonly IConfiguration _configuration;
    private readonly IBalanceManager _balanceManager;
    
    public BlockchainBalanceConsumer(IConfiguration configuration, IBalanceManager balanceManager)
    {
	    _configuration = configuration;
	    _balanceManager = balanceManager;
	    
        var uriToWeb3 = _configuration["Blockchain:Infura:Uri"] + _configuration["Blockchain:Infura:Key"];
        _web3 = new Web3(uriToWeb3);
    }
	
    public async Task Consume(ConsumeContext<CheckBalanceReplenishmentDto> context)
    {
        var contractAddress = _configuration["Blockchain:SmartContract:Address"];
	    var userBalanceModel = new GetUserBalanceFunction { UserAddress = context.Message.WalletAddress };
	    var contractFunction = _web3.Eth.GetContractQueryHandler<GetUserBalanceFunction>();
	    var currentBalance = await contractFunction.QueryAsync<GetUserBalanceOfOutputDTO>(contractAddress, userBalanceModel);

	    if (currentBalance.Result > context.Message.StartBalanceInBlockchain)
		    await _balanceManager.AddCashToBalanceAsync(context.Message.UserId, currentBalance.Result - context.Message.StartBalanceInBlockchain);

	    if (DateTime.UtcNow - context.Message.DateSend > new TimeSpan(0, 5, 0))
		    return;

	    await context.Publish(context.Message);
    }
}