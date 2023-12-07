using System.Collections.Generic;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Lot.Dto;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetProfileResponse
{
    public string UserName { get; init; } = null!;

    public decimal Balance { get; init; }

    public IEnumerable<AuctionResponse>? UserAuctions { get; init; }
    
    public IEnumerable<LotResponse>? WinLots { get; init; }
    
    public IEnumerable<LotResponse>? ParticipateLots { get; init; }
}