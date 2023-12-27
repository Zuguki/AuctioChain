using System.Text.Json;
using AuctioChain.MQ.Blockchain.Dto;
using AuctioChain.MQ.Blockchain.Functions;
using AuctioChain.MQ.Publishers;
using AuctioChain.MQ.Services.Dto;
using Nethereum.Web3;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AuctioChain.MQ.Services;

public class BlockchainBalanceListener : BackgroundService
{
    private readonly IConnectionFactory _connectionFactory;
    private readonly IConfiguration _configuration;
    private readonly IPublisher<TransactionDto> _publisher;
    private readonly Web3 _web3;

    public BlockchainBalanceListener(IConnectionFactory connectionFactory, IConfiguration configuration, IPublisher<TransactionDto> publisher)
    {
        _connectionFactory = connectionFactory;
        _configuration = configuration;
        _publisher = publisher;
        
        var uriToWeb3 = _configuration["Blockchain:Infura:Uri"] + _configuration["Blockchain:Infura:Key"];
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
            while (true)
            {
				var currentBalance = await contractFunction.QueryAsync<GetUserBalanceOfOutputDTO>(contractAddress, userBalanceModel);
	            if (currentBalance.Result > dto.StartBalanceInBlockchain)
	            {
		            var transaction = new TransactionDto
		            {
			            UserId = dto.UserId,
			            Cash = currentBalance.Result - dto.StartBalanceInBlockchain,
		            };
		            
					await _publisher.Publish("topic", "blockchain.events", "blockchain.balance.set", transaction);
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