namespace AuctioChain.MQ.Publishers;

public interface IBlockchainPublisher<T>
{
    Task Publish(string exchangeType, string exchangeName, string routingKey, T serializeDto);
}
