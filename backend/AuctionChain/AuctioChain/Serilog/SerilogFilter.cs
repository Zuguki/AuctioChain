using Serilog.Core;
using Serilog.Events;

namespace AuctioChain.Serilog;

public class SerilogFilter : ILogEventFilter
{
    public bool IsEnabled(LogEvent logEvent)
    {
        return true;
    }
}
