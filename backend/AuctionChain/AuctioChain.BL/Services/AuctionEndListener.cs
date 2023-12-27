using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions;
using AuctioChain.BL.Services.Dto;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;

namespace AuctioChain.BL.Services;

public class AuctionEndListener : BackgroundService
{
    private readonly IConnectionFactory _connectionFactory;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger _logger;

    public AuctionEndListener(IConnectionFactory connectionFactory, IServiceProvider serviceProvider, ILogger logger)
    {
        _connectionFactory = connectionFactory;
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();
        
        var connection = _connectionFactory.CreateConnection();
        var channel = connection.CreateModel();
        var consumer = new AsyncEventingBasicConsumer(channel);
        
        consumer.Received += async (_, args) =>
        {
            var dto = JsonSerializer.Deserialize<AuctionEndDto>(args.Body.ToArray());
            if (dto is not null)
            {
                _logger.Information($"Auction: {dto.Id} ended");
                using (var scope = _serviceProvider.CreateScope())
                {
                    var auctionManager = scope.ServiceProvider.GetService<IAuctionManager>();
                    await auctionManager!.AuctionEndAsync(dto);
                }
                channel.BasicAck(args.DeliveryTag, false);
            }
        };
        
        channel.BasicConsume(consumer, "end-auction");
    }
}