using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models;

namespace AuctioChain.Controllers.Auction.Dto;

public class GetUserAuctionsResponse
{
    /// <summary>
    /// Аукционы
    /// </summary>
    [JsonPropertyName("auctions")]
    public IEnumerable<AuctionDal> Auctions { get; set; }
}