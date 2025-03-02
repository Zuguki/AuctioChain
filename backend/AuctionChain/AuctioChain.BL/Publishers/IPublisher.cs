using System.Threading.Tasks;

namespace AuctioChain.BL.Publishers;

public interface IPublishers<in T>
{
    Task Publish(string exchangeType, string exchangeName, string routingKey, T serializeDto);
}