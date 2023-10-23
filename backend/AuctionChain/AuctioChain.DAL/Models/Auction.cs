using System;
using System.Collections.Generic;
using System.Linq;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Аукцион
/// </summary>
public class Auction
{
    /// <summary>
    /// Id аукциона 
    /// </summary>
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id пользователя, создавшего аукцион
    /// </summary>
    public Guid AuthorId { get; init; }
    
    /// <summary>
    /// Название аукциона
    /// </summary>
    public string? Name { get; init; }

    /// <summary>
    /// Статус торгов
    /// </summary>
    public AuctionStatus Status
    {
        get
        {
            var dateTimeNow = DateTime.UtcNow;
            
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
    /// Флаг, этапа создания аукциона 
    /// </summary>
    public bool IsCreation { get; init; }
    
    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    public DateTime DateStart { get; init; }

    private readonly DateTime _dateEnd;
    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    public DateTime DateEnd
    {
        get
        {
            var maxBetDate = Lots!.Values.SelectMany(lot => lot.Bets!).Max(bet => bet.DateTime).AddMinutes(1);
            return _dateEnd > maxBetDate ? _dateEnd : maxBetDate;
        }
    }

    /// <summary>
    /// Лоты на аукционее
    /// </summary>
    public Dictionary<Guid, Lot>? Lots { get; init; } = new();
}