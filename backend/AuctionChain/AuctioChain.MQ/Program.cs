using AuctioChain.MQ.Publishers;
using AuctioChain.MQ.Services;
using AuctioChain.MQ.Services.Dto;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IConnectionFactory>(_ => new ConnectionFactory
{
    Endpoint = new AmqpTcpEndpoint(),
    DispatchConsumersAsync = true,
});
builder.Services.AddHostedService<BlockchainBalanceListener>();

builder.Services.AddSingleton<IBlockchainPublisher<TransactionDto>, BlockchainPublisher<TransactionDto>>();

var app = builder.Build();

app.Run();