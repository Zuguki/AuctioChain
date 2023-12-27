using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Bet;

namespace AuctioChain.DAL.Models.Lot;

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
    public Guid? AuctionId { get; set; }

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
    /// Начальная цена
    /// </summary>
    [Column("initialPrice")]
    public decimal InitialPrice { get; set; }
    
    /// <summary>
    /// Шаг ставки
    /// </summary>
    [Column("betStep")]
    public decimal BetStep { get; set; }

    /// <summary>
    /// Ставки на лот
    /// </summary>
    [Column("bets")]
    public List<BetDal> Bets { get; set; } = new();

    /// <summary>
    /// Изображения лота
    /// </summary>
    [Column("image")]
    public string? Image { get; set; }
    
    /// <summary>
    /// .ctor
    /// </summary>
    public LotDal()
    {
    }

    /// <summary>
    /// .ctor
    /// </summary>
    public LotDal(Guid auctionId, string? name, string? description, decimal initialPrice, decimal betStep, string? image = null)
    {
        Id = Guid.NewGuid();
        AuctionId = auctionId;
        Name = name;
        Description = description;
        InitialPrice = initialPrice;
        BetStep = betStep;
        Image = image;
    }
}