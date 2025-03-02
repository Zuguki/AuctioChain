using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class GetLotsRequest
{
    /// <summary>
    /// Идентификатор ауцкиона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}