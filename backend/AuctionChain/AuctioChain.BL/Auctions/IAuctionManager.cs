using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using FluentResults;

namespace AuctioChain.BL.Auctions;

/// <inheritdoc />
public interface IAuctionManager : IManager<Guid, AuctionDal>
{
    Task<Result<IEnumerable<AuctionDal>>> GetUserAuctions(Guid id);
    
    /// <summary>
    /// Изменить состояние создания аукциона
    /// </summary>
    /// <param name="id">Id аукциона</param>
    Task<Result> ChangeCreationStateAsync(Guid id);

    /// <summary>
    /// Отменить аукцион
    /// </summary>
    /// <param name="id">Id аукциона</param>
    Task<Result> CancelAsync(Guid id);
}