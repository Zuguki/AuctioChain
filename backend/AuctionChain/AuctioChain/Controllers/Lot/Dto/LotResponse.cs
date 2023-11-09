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
    public Guid Id { get; set; }
    
    /// <summary>
    /// Id аукциона
    /// </summary>
    public Guid AuctionId { get; set; }
    
    /// <summary>
    /// Название лота
    /// </summary>
    public string? Name { get; set; }
    
    /// <summary>
    /// Описание лота
    /// </summary>
    public string? Description { get; set; }
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    public decimal BetStep { get; set; }
    
    /// <summary>
    /// Стоимость выкупа
    /// </summary>
    public decimal? BuyoutPrice { get; set; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    public string? Code { get; set; }

    /// <summary>
    /// Максимальная ставка
    /// </summary>
    public decimal? CurrentMaxBet { get; set; }

    /// <summary>
    /// Изображения лота
    /// </summary>
    public List<string>? Images { get; set; } = new();

    /// <summary>
    /// Выкуплен ли лот
    /// </summary>
    public bool IsPurchased { get; set; }
}