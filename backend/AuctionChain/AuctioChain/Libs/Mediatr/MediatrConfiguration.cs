using MediatR;

namespace AuctioChain.Libs.Mediatr;

public static class MediatrConfiguration
{
    public static void Connect(MediatRServiceConfiguration configuration)
    {
        configuration.AsScoped();
    }
}