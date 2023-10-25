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
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id аукциона
    /// </summary>
    [Column("auctionId")]
    public Guid AuctionId { get; init; }

    /// <summary>
    /// Аукцион
    /// </summary>
    [Column("auction")]
    [ForeignKey(nameof(AuctionId))]
    public AuctionDal? Auction { get; init; }
    
    /// <summary>
    /// Название лота
    /// </summary>
    [Column("name")]
    public string? Name { get; init; }
    
    /// <summary>
    /// Описание лота
    /// </summary>
    [Column("description")]
    public string? Description { get; init; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    [Column("code")]
    public string? Code { get; init; }
    
    /// <summary>
    /// Статус лота
    /// </summary>
    [Column("status")]
    public LotStatus Status { get; init; }

    /// <summary>
    /// Ставки на лот
    /// </summary>
    [Column("bets")]
    public List<Bet> Bets = new();

    /// <summary>
    /// Изображения лота
    /// </summary>
    [Column("images")]
    public List<string>? Images { get; init; } = new();

    /// <summary>
    /// Попытка сделать ставку
    /// </summary>
    /// <param name="bet">Ставка</param>
    /// <returns>Результат выполнения операции. Если по лоту торги завершенны или ставка с таким размером уже сделана, то вернет Fail</returns>
    public Result TryDoBet(Bet bet)
    {
        if (Status == LotStatus.Complete)
            return Result.Fail("На данный лот невозможно сделать ставку, т.к. торги завершенны");

        if (Bets.Any(b => b.Amount >= bet.Amount))
            return Result.Fail("Ваша была перекрыта, пожалуйста, повторите попытку");
        
        Bets.Add(bet);
        return Result.Ok();
    }
}