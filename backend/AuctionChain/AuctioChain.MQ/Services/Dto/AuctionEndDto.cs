using System.Text.Json.Serialization;

namespace AuctioChain.MQ.Services.Dto;

public class AuctionEndDto
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("id")]
    public Guid Id { get; init; }

    /// <summary>
    /// Id владельца аукциона
    /// </summary>
    [JsonPropertyName("userId")]
    public Guid? UserId { get; init; } = null!;
    
    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    [JsonPropertyName("dateEnd")]
    public DateTime DateEnd { get; init; }
}