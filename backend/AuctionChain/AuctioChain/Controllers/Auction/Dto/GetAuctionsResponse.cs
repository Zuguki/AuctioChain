using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models;

namespace AuctioChain.Controllers.Auction.Dto;

public class GetAuctionsResponse
{
    /// <summary>
    /// Аукционы
    /// </summary>
    [JsonPropertyName("auctions")]
    public IEnumerable<AuctionsResponse> Auctions { get; set; }
}