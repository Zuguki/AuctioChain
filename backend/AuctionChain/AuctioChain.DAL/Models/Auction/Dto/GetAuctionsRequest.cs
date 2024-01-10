using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class GetAuctionsRequest
{
    [JsonPropertyName("search")]
    public string? Search { get; set; }
    
    [JsonPropertyName("status")]
    public AuctionStatus? Status { get; set; }
}