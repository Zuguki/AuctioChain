using System.Text.Json.Serialization;

namespace AuctioChain.MQ.Services.Dto;

public class TransactionDto
{
    [JsonPropertyName("userId")]
    public Guid UserId { get; set; }
    
    [JsonPropertyName("cash")]
    public decimal Cash { get; set; }
}