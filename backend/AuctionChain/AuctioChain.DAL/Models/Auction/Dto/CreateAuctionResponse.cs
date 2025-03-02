using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class CreateAuctionResponse
{
    [JsonPropertyName("auctionId")]
    public Guid AuctionId { get; init; }
}