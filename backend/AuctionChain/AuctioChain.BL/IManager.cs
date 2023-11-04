using System.Collections.Generic;
using System.Threading.Tasks;
using FluentResults;

namespace AuctioChain.BL;

/// <summary>
/// Менеджер с логикой для Dal модели
/// </summary>
/// <typeparam name="TId">Id модели</typeparam>
/// <typeparam name="TModel">Модель</typeparam>
public interface IManager<in TId, TModel>
{
    /// <summary>
    /// Полуить все элементы
    /// </summary>
    Task<Result<IEnumerable<TModel>>> GetAllAsync();

    /// <summary>
    /// Получить модель по Id
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result<TModel>> GetByIdAsync(TId id);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="model">Модель для создания</param>
    Task<Result> CreateAsync(TModel model);
    
    /// <summary>
    /// Удалить модель
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result> DeleteAsync(TId id);

    /// <summary>
    /// Обновить модель
    /// </summary>
    /// <param name="model">Модель для обновления</param>
    Task<Result> UpdateAsync(TModel model);
}