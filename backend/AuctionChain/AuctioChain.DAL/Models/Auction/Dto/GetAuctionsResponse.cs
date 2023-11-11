using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class GetAuctionsResponse
{
    /// <summary>
    /// Аукционы
    /// </summary>
    [JsonPropertyName("auctions")]
    public IEnumerable<AuctionResponse> Auctions { get; set; }
}