using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Auction.Dto;

public class UpdateAuctionRequest
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
    
    /// <summary>
    /// Новое название аукциона
    /// </summary>
    [JsonPropertyName("name")]
    public string? Name { get; init; }
    
    /// <summary>
    /// Новая Дата начала аукциона
    /// </summary>
    [JsonPropertyName("dateStart")]
    public DateTime DateStart { get; init; } 
    
    /// <summary>
    /// Новая Дата завершения аукциона
    /// </summary>
    [JsonPropertyName("dateEnd")]
    public DateTime DateEnd { get; init; }
}