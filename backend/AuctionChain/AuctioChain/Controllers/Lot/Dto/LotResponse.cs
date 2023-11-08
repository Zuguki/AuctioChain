using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.Controllers.Bet.Dto;

namespace AuctioChain.Controllers.Lot.Dto;

public class LotResponse
{
    /// <summary>
    /// Id лота
    /// </summary>
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    public Guid AuctionId { get; set; }
    
    /// <summary>
    /// Название лота
    /// </summary>
    [JsonPropertyName("name")]
    public string? Name { get; set; }
    
    /// <summary>
    /// Описание лота
    /// </summary>
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    [JsonPropertyName("betStep")]
    public decimal BetStep { get; set; }
    
    /// <summary>
    /// Стоимость выкупа
    /// </summary>
    [JsonPropertyName("buyoutPrice")]
    public decimal? BuyoutPrice { get; set; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    [JsonPropertyName("code")]
    public string? Code { get; set; }

    /// <summary>
    /// Ставки на лот
    /// </summary>
    [JsonPropertyName("bets")]
    public List<BetResponse> Bets { get; set; } = new();

    /// <summary>
    /// Изображения лота
    /// </summary>
    [JsonPropertyName("images")]
    public List<string>? Images { get; set; } = new();
}