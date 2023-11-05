using System;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.PageLot.Dto;

public class GetLotsRequest
{
    /// <summary>
    /// Идентификатор ауцкиона
    /// </summary>
    [JsonPropertyName("auctionId")]
    public Guid AuctionId { get; init; }
}