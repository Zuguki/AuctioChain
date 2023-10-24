using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Ставка
/// </summary>
[Table("bets")]
public class Bet
{
    /// <summary>
    /// Id ставки
    /// </summary>
    [Column("Id")]
    [Key]
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id пользователя, сделавшего ставку
    /// </summary>
    [Column("authorId")]
    public Guid AuthorId { get; init; }
    
    /// <summary>
    /// Пользователь, сделавший ставку
    /// </summary>
    [Column("author")]
    [ForeignKey(nameof(AuthorId))]
    public Author? Author { get; init; }
    
    /// <summary>
    /// Id лота, на который сделана ставка
    /// </summary>
    [Column("lotId")]
    public Guid LotId { get; init; }

    /// <summary>
    /// Лот, на который сделана ставка
    /// </summary>
    [Column("lot")]
    [ForeignKey(nameof(LotId))]
    public Lot? Lot { get; init; }
    
    /// <summary>
    /// Размер ставки
    /// </summary>
    [Column("amount")]
    public decimal Amount { get; init; }
    
    /// <summary>
    /// Дата ставки
    /// </summary>
    [Column("dateTime")]
    public DateTime DateTime { get; init; }
}