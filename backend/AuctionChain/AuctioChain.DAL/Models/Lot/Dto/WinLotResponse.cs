using System;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class WinLotResponse
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
    /// Цена покупки
    /// </summary>
    public decimal? Price { get; set; }

    /// <summary>
    /// Изображения лота
    /// </summary>
    public string? Image { get; set; }
}