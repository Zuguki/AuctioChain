using System;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.PageLot.Dto;

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
    /// Код лота
    /// </summary>
    [JsonPropertyName("code")]
    public string Code { get; init; } = null!;
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    [JsonPropertyName("betStep")]
    public decimal BetStep { get; init; }
    
    /// <summary>
    /// Стоимость выкупа лота
    /// </summary>
    [JsonPropertyName("buyoutPrice")]
    public decimal? BuyoutPrice { get; init; }
}