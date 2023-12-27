using System.Text.Json;
using AuctioChain.MQ.Services.Dto;
using RabbitMQ.Client;

namespace AuctioChain.MQ.Publishers;

public class AuctionEndPublisher : IPublisher<AuctionEndDto>
{
    private readonly IConnectionFactory _connectionFactory;

    public AuctionEndPublisher(IConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public Task Publish(string exchangeType, string exchangeName, string routingKey, AuctionEndDto serializeDto)
    {
        using var connection = _connectionFactory.CreateConnection();
        using var channel = connection.CreateModel();

        var basicProperties = channel.CreateBasicProperties();
        channel.BasicPublish(
            new PublicationAddress(exchangeType, exchangeName, routingKey),
            basicProperties,
            JsonSerializer.SerializeToUtf8Bytes(serializeDto)
        );

        return Task.CompletedTask;
    }
}