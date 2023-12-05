using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models.Auction.Dto;

namespace AuctioChain.DAL.Models.User.Dto;

public class GetUserAuctionsResponse
{
    [JsonPropertyName("auctions")]
    public IEnumerable<AuctionResponse>? Auctions { get; init; }
}