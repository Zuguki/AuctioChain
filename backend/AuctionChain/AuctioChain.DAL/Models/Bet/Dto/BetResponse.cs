using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Bet.Dto;

public class BetResponse
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
    
    [JsonPropertyName("userId")]
    public Guid UserId { get; init; }
    
    [JsonPropertyName("lotId")]
    public Guid LotId { get; init; }

    [JsonPropertyName("amount")]
    public decimal Amount { get; init; }
    
    [JsonPropertyName("dateTime")]
    public DateTime DateTime { get; init; }
}