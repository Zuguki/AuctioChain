using Serilog.Core;
using Serilog.Events;

namespace AuctioChain.Serilog;

public class SerilogEnrich : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        logEvent.AddOrUpdateProperty(propertyFactory.CreateProperty("EventId", "AuctioChain"));
        logEvent.AddOrUpdateProperty(propertyFactory.CreateProperty("User", "GoodGod"));
    }
}
