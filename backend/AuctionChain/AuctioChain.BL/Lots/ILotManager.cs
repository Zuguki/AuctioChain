using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using FluentResults;

namespace AuctioChain.BL.Lots;

public interface ILotManager 
{
    /// <summary>
    /// Получить лоты по Id
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result<IEnumerable<Lot>>> GetByIdAsync(Guid id);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="model">Модель для создания</param>
    Task<Result> CreateAsync(Lot model);
    
    /// <summary>
    /// Удалить модель
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result> DeleteAsync(Guid id);

    /// <summary>
    /// Обновить модель
    /// </summary>
    /// <param name="model">Модель для обновления</param>
    Task<Result> UpdateAsync(Lot model);
}