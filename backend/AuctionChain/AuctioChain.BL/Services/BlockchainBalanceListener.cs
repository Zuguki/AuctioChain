using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
using AuctioChain.BL.Services.Dto;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;

namespace AuctioChain.BL.Services;

public class BlockchainBalanceListener : BackgroundService
{
    private readonly ILogger _logger;
    private readonly IConnectionFactory _connectionFactory;
    private readonly IServiceProvider _serviceProvider;

    public BlockchainBalanceListener(ILogger logger, IConnectionFactory connectionFactory, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _connectionFactory = connectionFactory;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();
        
        var connection = _connectionFactory.CreateConnection();
        var channel = connection.CreateModel();
        var consumer = new AsyncEventingBasicConsumer(channel);

        consumer.Received += async (_, args) =>
        {
            var dto = JsonSerializer.Deserialize<TransactionDto>(args.Body.ToArray())!;
            _logger.Information($"Update balance for user: {dto.UserId}");
            using (var scope = _serviceProvider.CreateScope())
            {
                var balanceManager = scope.ServiceProvider.GetService<IBalanceManager>();
                await balanceManager?.AddCashToBalanceAsync(dto.UserId, dto.Cash)!;
            }
            channel.BasicAck(args.DeliveryTag, false);
        };
        
        channel.BasicConsume(consumer, "set-balance");
    }
}