using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using FluentResults;

namespace AuctioChain.BL.Lots;

public interface ILotManager 
{
    /// <summary>
    /// Получить лоты по Id аукциона
    /// </summary>
    /// <param name="auctionId">Id аукциона</param>
    Task<Result<IEnumerable<LotDal>>> GetByIdAsync(Guid auctionId);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="model">Модель для создания</param>
    Task<Result> CreateAsync(LotDal model);
    
    /// <summary>
    /// Удалить лот
    /// </summary>
    /// <param name="id">Id лота</param>
    Task<Result> DeleteAsync(Guid id);

    /// <summary>
    /// Обновить модель
    /// </summary>
    /// <param name="model">Модель для обновления</param>
    Task<Result> UpdateAsync(LotDal model);
}