using System;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions;
using AuctioChain.BL.Services.Dto;
using MassTransit;

namespace AuctioChain.BL.Services;

public class AuctionEndConsumer : IConsumer<AuctionEndDto>
{
    private readonly IAuctionManager _auctionManager;

    public AuctionEndConsumer(IAuctionManager auctionManager)
    {
        _auctionManager = auctionManager;
    }

    public async Task Consume(ConsumeContext<AuctionEndDto> context)
    {
        var dto = context.Message;
        if (DateTime.UtcNow >= dto.DateEnd)
            await _auctionManager.AuctionEndAsync(dto);
        else
            await context.Publish(dto);
    }
}