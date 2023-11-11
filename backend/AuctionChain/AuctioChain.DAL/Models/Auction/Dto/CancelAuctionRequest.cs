using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class CancelAuctionRequest
{
    /// <summary>
    ///  Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}