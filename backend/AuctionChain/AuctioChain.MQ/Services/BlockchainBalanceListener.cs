using System.Text.Json;
using AuctioChain.BL.Profile;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.MQ.Blockchain.Dto;
using AuctioChain.MQ.Blockchain.Functions;
using Nethereum.Web3;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AuctioChain.MQ.Services;

public class BlockchainBalanceListener : BackgroundService
{
    private readonly IConnectionFactory _connectionFactory;
    private readonly IConfiguration _configuration;
    private readonly IProfileManager _profileManager;
    private readonly Web3 _web3;

    public BlockchainBalanceListener(IConnectionFactory connectionFactory, IConfiguration configuration, IProfileManager profileManager)
    {
        _connectionFactory = connectionFactory;
        _configuration = configuration;
        _profileManager = profileManager;
        
        var uriToWeb3 = _configuration["Blockchain:Infura:Key"] + _configuration["Blockchain:Infura:Uri"];
        _web3 = new Web3(uriToWeb3);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();
        
        var connection = _connectionFactory.CreateConnection();
        var channel = connection.CreateModel();
        var consumer = new AsyncEventingBasicConsumer(channel);
        var contractAddress = _configuration["Blockchain:SmartContract:Address"];

        consumer.Received += async (_, args) =>
        {
            var dto = JsonSerializer.Deserialize<CheckBalanceReplenishmentDto>(args.Body.ToArray());

            var userBalanceModel = new GetUserBalanceFunction
            {
	            UserAddress = dto!.WalletAddress
            };

            var contractFunction = _web3.Eth.GetContractQueryHandler<GetUserBalanceFunction>();
            var startBalance = await contractFunction.QueryAsync<GetUserBalanceOfOutputDTO>(contractAddress, userBalanceModel);

            while (true)
            {
				var currentBalance = await contractFunction.QueryAsync<GetUserBalanceOfOutputDTO>(contractAddress, userBalanceModel);
	            if (currentBalance.Result > startBalance.Result)
	            {
		            var cashCount = currentBalance.Result - startBalance.Result;
		            await _profileManager.AddUserBalanceAsync(dto.UserId, cashCount);
		            break;
	            }

	            if (DateTime.UtcNow - dto.DateSend > new TimeSpan(0, 2, 0))
		            break;

	            await Task.Delay(new TimeSpan(0, 0, 0, 15), stoppingToken);
            }

            channel.BasicAck(args.DeliveryTag, false);
        };
        
        channel.BasicConsume(consumer, "check-balance");
    }
}