using System;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Ставка
/// </summary>
public class Bet
{
    /// <summary>
    /// Id ставки
    /// </summary>
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id пользователя, сделавшего ставку
    /// </summary>
    public Guid AuthorId { get; init; }
    
    /// <summary>
    /// Id лота, на который сделана ставка
    /// </summary>
    public Guid LotId { get; init; }
    
    /// <summary>
    /// Размер ставки
    /// </summary>
    public decimal Amount { get; init; }
    
    /// <summary>
    /// Дата ставки
    /// </summary>
    public DateTime DateTime { get; init; }
}