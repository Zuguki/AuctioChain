namespace AuctioChain.MQ.Publishers;

public interface IPublisher<in T>
{
    Task Publish(string exchangeType, string exchangeName, string routingKey, T serializeDto);
}
