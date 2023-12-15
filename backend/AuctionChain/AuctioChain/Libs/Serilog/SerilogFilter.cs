using Serilog.Core;
using Serilog.Events;

namespace AuctioChain.Libs.Serilog;

public class SerilogFilter : ILogEventFilter
{
    public bool IsEnabled(LogEvent logEvent)
    {
        return true;
    }
}
