using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class GetAuctionsRequest
{
    [JsonPropertyName("search")]
    public string? Search { get; set; }
    
    [JsonPropertyName("auctionStatus")]
    public AuctionStatus? AuctionStatus { get; set; }
    
    [JsonPropertyName("OrderByStatus")]
    public OrderByAuctionStatus? OrderByStatus { get; set; }
}