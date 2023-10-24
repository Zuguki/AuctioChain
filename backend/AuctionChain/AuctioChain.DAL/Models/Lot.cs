using System;
using System.Collections.Generic;
using System.Linq;
using FluentResults;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Лот
/// </summary>
public class Lot
{
    /// <summary>
    /// Id лота
    /// </summary>
    public Guid Id { get; init; }
    
    /// <summary>
    /// Id аукциона
    /// </summary>
    public Guid AuctionId { get; init; }
    
    /// <summary>
    /// Название лота
    /// </summary>
    public string? Name { get; init; }
    
    /// <summary>
    /// Описание лота
    /// </summary>
    public string? Description { get; init; }
    
    /// <summary>
    /// Код лота
    /// </summary>
    public string? Code { get; init; }
    
    /// <summary>
    /// Статус лота
    /// </summary>
    public LotStatus Status { get; init; }

    /// <summary>
    /// Ставки на лот
    /// </summary>
    public List<Bet> Bets => _bets;
    private readonly List<Bet> _bets = new();

    /// <summary>
    /// Изображения лота
    /// </summary>
    public List<string> Images { get; init; } = new List<string>();

    /// <summary>
    /// Попытка сделать ставку
    /// </summary>
    /// <param name="bet">Ставка</param>
    /// <returns>Результат выполнения операции. Если по лоту торги завершенны или ставка с таким размером уже сделана, то вернет Fail</returns>
    public Result TryDoBet(Bet bet)
    {
        if (Status == LotStatus.Complete)
            return Result.Fail("На данный лот невозможно сделать ставку, т.к. торги завершенны");

        if (_bets.Any(b => b.Amount >= bet.Amount))
            return Result.Fail("Ваша была перекрыта, пожалуйста, повторите попытку");
        
        _bets.Add(bet);
        return Result.Ok();
    }
}