using System;
using System.Collections.Generic;

namespace AuctioChain.DAL.Models.Lot.Dto;

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
    /// Начальная ставка
    /// </summary>
    public decimal InitialPrice { get; set; }
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    public decimal BetStep { get; set; }

    /// <summary>
    /// Максимальная ставка
    /// </summary>
    public decimal? CurrentMaxBet { get; set; }

    /// <summary>
    /// Изображения лота
    /// </summary>
    public string? Image { get; set; }
}