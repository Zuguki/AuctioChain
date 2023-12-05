using System.Collections.Generic;
using AuctioChain.DAL.Models.Auction.Dto;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetProfileResponse
{
    public string UserName { get; init; } = null!;

    public IEnumerable<AuctionResponse>? UserAuctions { get; init; }
}