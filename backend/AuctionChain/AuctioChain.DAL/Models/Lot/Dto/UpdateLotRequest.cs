using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

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
    /// Начальная ставка
    /// </summary>
    [JsonPropertyName("initialPrice")]
    public decimal InitialPrice { get; set; }
    
    /// <summary>
    /// Шаг ставки лота
    /// </summary>
    [JsonPropertyName("betStep")]
    public decimal BetStep { get; init; }
}