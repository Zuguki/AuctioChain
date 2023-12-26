using System.Text.Json;
using RabbitMQ.Client;

namespace AuctioChain.MQ.Publishers;

public class BlockchainPublisher<T> : IBlockchainPublisher<T>
{
    private readonly IConnectionFactory _connectionFactory;

    public BlockchainPublisher(IConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public Task Publish(string exchangeType, string exchangeName, string routingKey, T serializeDto)
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
