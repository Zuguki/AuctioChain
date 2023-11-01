using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Лот
/// </summary>
[Table("lots")]
public class LotDal
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
    /// Шаг ставки
    /// </summary>
    [Column("betStep")]
    public decimal BetStep { get; set; }
    
    /// <summary>
    /// Стоимость выкупа
    /// </summary>
    [Column("buyoutPrice")]
    public decimal? BuyoutPrice { get; set; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    [Column("code")]
    public string? Code { get; set; }

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
    
    /// <summary>
    /// Выкуплен ли лот
    /// </summary>
    public bool IsPurchased => Bets.Count > 0 && Bets.Max(b => b.Amount) == BuyoutPrice;

    /// <summary>
    /// .ctor
    /// </summary>
    public LotDal()
    {
    }

    /// <summary>
    /// .ctor
    /// </summary>
    public LotDal(Guid auctionId, string? name, string? description, string? code, decimal betStep, decimal? buyoutPrice = null)
    {
        Id = Guid.NewGuid();
        AuctionId = auctionId;
        Name = name;
        Description = description;
        BetStep = betStep;
        BuyoutPrice = buyoutPrice;
        Code = code;
    }
}