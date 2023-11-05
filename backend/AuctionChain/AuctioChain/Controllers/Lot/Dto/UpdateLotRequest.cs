using System;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.PageLot.Dto;

public class UpdateLotRequest
{
    /// <summary>
    /// Идентификатор лота
    /// </summary>
    [JsonPropertyName("lotId")]
    public Guid LotId { get; init; }

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
    /// Шаг ставки лота
    /// </summary>
    [JsonPropertyName("betStep")]
    public decimal BetStep { get; init; }
    
    /// <summary>
    /// Стоимость выкупа у лота
    /// </summary>
    [JsonPropertyName("buyoutPrice")]
    public decimal? BuyoutPrice { get; init; }
}