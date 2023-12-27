using System.Text.Json;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Profile.Dto;
using RabbitMQ.Client;

namespace AuctioChain.BL.Publishers;

public class BlockchainPublisher : IPublisher<CheckBalanceReplenishmentDto>
{
    private readonly IConnectionFactory _connectionFactory;

    public BlockchainPublisher(IConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public Task Publish(string exchangeType, string exchangeName, string routingKey, CheckBalanceReplenishmentDto serializeDto)
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