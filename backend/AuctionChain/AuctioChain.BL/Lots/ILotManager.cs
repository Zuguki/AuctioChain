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
    Task<Result<(GetLotsResponse, PaginationMetadata)>> GetByIdAsync(GetLotsRequest request, PaginationRequest pagination);

    /// <summary>
    /// Получение лота по id
    /// </summary>
    Task<Result<LotResponse>> GetLotByIdAsync(Guid id);

    /// <summary>
    /// Создать модель
    /// </summary>
    Task<Result> CreateAsync(CreateLotRequest request, Guid userId);
    
    /// <summary>
    /// Удалить лот
    /// </summary>
    Task<Result> DeleteAsync(DeleteLotRequest request, Guid userId);

    /// <summary>
    /// Обновить модель
    /// </summary>
    Task<Result> UpdateAsync(UpdateLotRequest request, Guid userId);
}