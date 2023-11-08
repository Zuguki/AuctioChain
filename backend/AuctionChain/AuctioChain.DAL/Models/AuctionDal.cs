using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Аукцион
/// </summary>
[Table("auctions")]
public class AuctionDal
{
    /// <summary>
    /// Id аукциона 
    /// </summary>
    [Column("Id")]
    [Key]
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id пользователя, создавшего аукцион
    /// </summary>
    [Column("userId")]
    public Guid UserId { get; set; }

    /// <summary>
    /// Пользователь, создавший аукцион
    /// </summary>
    [Column("user")]
    [ForeignKey(nameof(UserId))]
    public ApplicationUser? User { get; init; }
    
    /// <summary>
    /// Описание аукциона
    /// </summary>
    [Column("description")]
    public string? Description { get; set; }
    
    /// <summary>
    /// Название аукциона
    /// </summary>
    [Column("name")]
    public string? Name { get; set; }

    /// <summary>
    /// Статус торгов
    /// </summary>
    public AuctionStatus Status
    {
        get
        {
            var dateTimeNow = DateTime.UtcNow;

            if (IsCanceled)
                return AuctionStatus.Canceled;
            if (IsCreation)
                return AuctionStatus.Creation;
            if (dateTimeNow > DateEnd)
                return AuctionStatus.Complete;
            if (dateTimeNow < DateStart)
                return AuctionStatus.WaitBidding;
            if (dateTimeNow > DateStart && dateTimeNow < DateEnd)
                return AuctionStatus.Bidding;

            return AuctionStatus.Unknown;
        }
    }
    
    /// <summary>
    /// Картинка аукциона
    /// </summary>
    public string? Image { get; set; }

    /// <summary>
    /// Флаг, можно ли редактировать аукцион
    /// </summary>
    public bool IsEditable => Status is not (AuctionStatus.Bidding or AuctionStatus.Complete or AuctionStatus.Canceled);
    
    /// <summary>
    /// Флаг, этапа создания аукциона 
    /// </summary>
    [Column("isCreation")]
    public bool IsCreation { get; set; }
    
    /// <summary>
    /// Флаг, отмены аукциона
    /// </summary>
    [Column("isCanceled")]
    public bool IsCanceled { get; set; }
    
    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    [Column("dateStart")]
    public DateTime DateStart { get; set; }

    private DateTime _dateEnd;
    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    [Column("dateEnd")]
    public DateTime DateEnd
    {
        get
        {
            if (Lots!.Count == 0 || Lots.Any(l => l.Bets.Count == 0))
                return _dateEnd;
            
            var maxBetDate = Lots.SelectMany(lot => lot.Bets!).Max(bet => bet.DateTime).AddMinutes(1);
            return _dateEnd > maxBetDate ? _dateEnd : maxBetDate;
        }
        set => _dateEnd = value;
    }

    /// <summary>
    /// Лоты на аукционее
    /// </summary>
    [Column("lots")]
    public List<LotDal>? Lots { get; init; } = new();

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionDal()
    {
    }

    /// <summary>
    /// .ctor
    /// </summary>
    /// <param name="name">Название аукциона</param>
    /// <param name="userId">Id автора аукциона</param>
    /// <param name="dateStart">Дата начала аукциона</param>
    /// <param name="dateEnd">Дата завершения аукциона</param>
    public AuctionDal(string name, Guid userId, DateTime dateStart, DateTime dateEnd, string? description, string? image)
    {
        Id = Guid.NewGuid();
        Name = name;
        UserId = userId;
        DateStart = dateStart;
        DateEnd = dateEnd;
        Description = description;
        Image = image;
        IsCreation = true;
        IsCanceled = false;
    }
}