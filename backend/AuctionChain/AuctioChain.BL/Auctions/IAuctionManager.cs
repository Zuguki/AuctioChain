using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Pagination;
using FluentResults;

namespace AuctioChain.BL.Auctions;

public interface IAuctionManager
{
    /// <summary>
    /// Полуить все элементы
    /// </summary>
    Task<Result<(GetAuctionsResponse, PaginationMetadata)>> GetAllAsync(PaginationRequest pagination);

    /// <summary>
    /// Получить модель по Id
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result<GetAuctionByIdResponse>> GetByIdAsync(Guid id);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="model">Модель для создания</param>
    /// <param name="userId">Id пользователя</param>
    Task<Result> CreateAsync(CreateAuctionRequest model, Guid userId);
    
    /// <summary>
    /// Удалить модель
    /// </summary>
    Task<Result> DeleteAsync(Guid id, Guid userId);

    /// <summary>
    /// Обновить модель
    /// </summary>
    Task<Result> UpdateAsync(UpdateAuctionRequest model, Guid userId);

    /// <summary>
    /// Изменить состояние создания аукциона
    /// </summary>
    /// <param name="id">Id аукциона</param>
    /// <param name="userId">Id пользователя, который сделал запрос</param>
    Task<Result> ChangeCreationStateAsync(Guid id, Guid userId);

    /// <summary>
    /// Отменить аукцион
    /// </summary>
    /// <param name="id">Id аукциона</param>
    /// <param name="userId">Id пользователя, который сделал запрос</param>
    Task<Result> CancelAsync(Guid id, Guid userId);
}