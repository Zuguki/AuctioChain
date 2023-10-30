using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using FluentResults;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Лот
/// </summary>
[Table("lots")]
public class Lot
{
    /// <summary>
    /// Id лота
    /// </summary>
    [Column("Id")]
    [Key]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Id аукциона
    /// </summary>
    [Column("auctionId")]
    public Guid AuctionId { get; set; }

    /// <summary>
    /// Аукцион
    /// </summary>
    [Column("auction")]
    [ForeignKey(nameof(AuctionId))]
    public AuctionDal? Auction { get; set; }
    
    /// <summary>
    /// Название лота
    /// </summary>
    [Column("name")]
    public string? Name { get; set; }
    
    /// <summary>
    /// Описание лота
    /// </summary>
    [Column("description")]
    public string? Description { get; set; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    [Column("code")]
    public string? Code { get; set; }
    
    /// <summary>
    /// Статус лота
    /// </summary>
    [Column("status")]
    public LotStatus Status { get; set; }

    /// <summary>
    /// Ставки на лот
    /// </summary>
    [Column("bets")]
    public List<Bet> Bets { get; set; } = new();

    /// <summary>
    /// Изображения лота
    /// </summary>
    [Column("images")]
    public List<string>? Images { get; set; } = new();
}