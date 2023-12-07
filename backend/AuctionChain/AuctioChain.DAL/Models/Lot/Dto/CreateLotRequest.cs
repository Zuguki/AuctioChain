using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class CreateLotRequest
{
    /// <summary>
    /// Идентификатор ауцкиона для которого создаем лот
    /// </summary>
    [JsonPropertyName("auctionId")]
    public Guid AuctionId { get; init; }

    /// <summary>
    /// Название лота
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; init; } = null!;

    /// <summary>
    /// Описание лота
    /// </summary>
    [JsonPropertyName("description")]
    public string Description { get; init; } = null!;
    
    /// <summary>
    /// Начальная цена
    /// </summary>
    [JsonPropertyName("initialPrice")]
    public decimal InitialPrice { get; init; }
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    [JsonPropertyName("betStep")]
    public decimal BetStep { get; init; }
    
    /// <summary>
    /// Картинка
    /// </summary>
    [JsonPropertyName("image")]
    public string? Image { get; init; }
}