using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Lot.Dto;
using AuctioChain.DAL.Models.Pagination;
using FluentResults;

namespace AuctioChain.BL.Lots;

public interface ILotManager 
{
    /// <summary>
    /// Получить лоты по Id аукциона
    /// </summary>
    Task<Result<GetLotsResponse>> GetByIdAsync(GetLotsRequest request, PaginationRequest pagination);

    /// <summary>
    /// Получение лота по id
    /// </summary>
    Task<Result<LotResponse>> GetLotByIdAsync(Guid id);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="request">Модель для создания</param>
    Task<Result> CreateAsync(CreateLotRequest request);
    
    /// <summary>
    /// Удалить лот
    /// </summary>
    Task<Result> DeleteAsync(DeleteLotRequest request);

    /// <summary>
    /// Обновить модель
    /// </summary>
    Task<Result> UpdateAsync(UpdateLotRequest request);
}