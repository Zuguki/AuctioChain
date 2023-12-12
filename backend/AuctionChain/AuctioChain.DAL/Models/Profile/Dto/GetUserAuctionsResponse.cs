using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models.Auction.Dto;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetUserAuctionsResponse
{
    /// <summary>
    /// Аукционы
    /// </summary>
    [JsonPropertyName("auctions")]
    public IEnumerable<AuctionResponse> Auctions { get; set; }
}