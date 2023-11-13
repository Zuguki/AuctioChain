using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using FluentResults;

namespace AuctioChain.BL.Auctions;

public interface IAuctionManager
{
    /// <summary>
    /// Полуить все элементы
    /// </summary>
    Task<Result<GetAuctionsResponse>> GetAllAsync();

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
    /// <param name="id">Id модели</param>
    Task<Result> DeleteAsync(Guid id);

    /// <summary>
    /// Обновить модель
    /// </summary>
    /// <param name="model">Модель для обновления</param>
    Task<Result> UpdateAsync(UpdateAuctionRequest model);
    
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