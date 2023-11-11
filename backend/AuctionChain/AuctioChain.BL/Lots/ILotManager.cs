using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Lot;
using AuctioChain.DAL.Models.Lot.Dto;
using FluentResults;

namespace AuctioChain.BL.Lots;

public interface ILotManager 
{
    /// <summary>
    /// Получить лоты по Id аукциона
    /// </summary>
    Task<Result<GetLotsResponse>> GetByIdAsync(GetLotsRequest request);

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