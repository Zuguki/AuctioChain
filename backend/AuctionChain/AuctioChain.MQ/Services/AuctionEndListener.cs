using System.Text.Json;
using AuctioChain.MQ.Publishers;
using AuctioChain.MQ.Services.Dto;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AuctioChain.MQ.Services;

public class AuctionEndListener : BackgroundService
{
    private readonly IConnectionFactory _connectionFactory;
    private readonly IPublisher<AuctionEndDto> _auctionEndPublisher;

    public AuctionEndListener(IConnectionFactory connectionFactory, IPublisher<AuctionEndDto> auctionEndPublisher)
    {
        _connectionFactory = connectionFactory;
        _auctionEndPublisher = auctionEndPublisher;
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
                if (DateTime.UtcNow >= dto.DateEnd)
					await _auctionEndPublisher.Publish("topic", "auction.events", "auction.end", dto);
                else
					await _auctionEndPublisher.Publish("topic", "auction.events", "auction.check-end", dto);
                
                channel.BasicAck(args.DeliveryTag, false);
            }
        };
        
        channel.BasicConsume(consumer, "check-end-auction");
    }
}