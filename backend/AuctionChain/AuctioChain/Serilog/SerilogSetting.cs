using Destructurama;
using Serilog;
using Serilog.Events;

namespace AuctioChain.Serilog;

public static class SerilogSetting
{
    public static void Connect(HostBuilderContext context, LoggerConfiguration configuration)
    {
        configuration
            .Enrich.WithThreadId()
            .Enrich.FromLogContext()
            .AuditTo.Sink<SerilogSink>()
            .Filter.With<SerilogFilter>()
            .Enrich.With<SerilogEnrich>()
            .Destructure.UsingAttributes()
            .WriteTo.Console(
                LogEventLevel.Information,
                outputTemplate:
                "{Timestamp:HH:mm:ss:ms} LEVEL: [{Level}] THREAD: |{ThreadId}| USER: |{User}| ->{EventId}<- {Message}{NewLine}{Exception}");
    }
}