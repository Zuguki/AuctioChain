﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Ставка
/// </summary>
[Table("bets")]
public class BetDal
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
    [Column("userId")]
    public Guid UserId { get; init; }
    
    /// <summary>
    /// Пользователь, сделавший ставку
    /// </summary>
    [Column("user")]
    [ForeignKey(nameof(UserId))]
    public ApplicationUser? User { get; init; }
    
    /// <summary>
    /// Id лота, на который сделана ставка
    /// </summary>
    [Column("lotId")]
    public Guid LotId { get; init; }

    /// <summary>
    /// Лот, на который сделана ставка
    /// </summary>
    [Column("lot")]
    public LotDal? PageLot { get; init; }
    
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

    /// <summary>
    /// .ctor
    /// </summary>
    public BetDal()
    {
    }

    /// <summary>
    /// .ctor
    /// </summary>
    public BetDal(Guid userId, Guid lotId, decimal amount)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        LotId = lotId;
        Amount = amount;
        DateTime = DateTime.UtcNow;
    }
}