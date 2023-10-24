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
public class Auction
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
    [Column("authorId")]
    public Guid AuthorId { get; init; }

    // TODO: Добавить свойство автора
    // /// <summary>
    // /// Пользователь, создавший аукцион
    // /// </summary>
    // [Column("author")]
    // [ForeignKey(nameof(AuthorId))]
    // public Author? Author { get; init; }
    
    /// <summary>
    /// Название аукциона
    /// </summary>
    [Column("name")]
    public string? Name { get; private set; }

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
    /// Флаг, можно ли редактировать аукцион
    /// </summary>
    public bool IsEditable => Status is not (AuctionStatus.Bidding or AuctionStatus.Complete or AuctionStatus.Canceled);
    
    /// <summary>
    /// Флаг, этапа создания аукциона 
    /// </summary>
    [Column("isCreation")]
    public bool IsCreation { get; private set; }
    
    /// <summary>
    /// Флаг, отмены аукциона
    /// </summary>
    [Column("isCanceled")]
    public bool IsCanceled { get; private set; }
    
    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    [Column("dateStart")]
    public DateTime DateStart { get; private set; }

    private DateTime _dateEnd;
    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    [Column("dateEnd")]
    public DateTime DateEnd
    {
        get
        {
            if (Lots!.Count == 0)
                return _dateEnd;
            
            var maxBetDate = Lots.SelectMany(lot => lot.Bets!).Max(bet => bet.DateTime).AddMinutes(1);
            return _dateEnd > maxBetDate ? _dateEnd : maxBetDate;
        }
        private set => _dateEnd = value;
    }

    /// <summary>
    /// Лоты на аукционее
    /// </summary>
    [Column("lots")]
    public List<Lot>? Lots { get; init; } = new();

    /// <summary>
    /// .ctor
    /// </summary>
    /// <param name="name">Название аукциона</param>
    /// <param name="authorId">Id автора аукциона</param>
    /// <param name="dateStart">Дата начала аукциона</param>
    /// <param name="dateEnd">Дата завершения аукциона</param>
    public Auction(string name, Guid authorId, DateTime dateStart, DateTime dateEnd)
    {
        Id = Guid.NewGuid();
        Name = name;
        AuthorId = authorId;
        DateStart = dateStart;
        DateEnd = dateEnd;
        IsCreation = true;
        IsCanceled = false;
    }
    
    /// <summary>
    /// Изменить название аукциона
    /// </summary>
    /// <param name="name">Новое название аукциона</param>
    public void UpdateName(string name) => Name = name;

    /// <summary>
    /// Изменить дату начала аукциона
    /// </summary>
    /// <param name="dateTime">Новая дата начала аукциона</param>
    public void UpdateDateStart(DateTime dateTime) => DateStart = dateTime;
    
    /// <summary>
    /// Изменить дату завершения аукциона
    /// </summary>
    /// <param name="dateTime">Новая дата завершения аукциона</param>
    public void UpdateDateEnd(DateTime dateTime) => DateEnd = dateTime;

    /// <summary>
    /// Изменить состояние создания аукциона
    /// </summary>
    public void ChangeCreationState() => IsCreation = !IsCreation;

    /// <summary>
    /// Отменить аукцион
    /// </summary>
    public void Cancel() => IsCanceled = true;
}