using System;
using System.Collections.Generic;
using AuctioChain.DAL.Models;

namespace AuctioChain.Controllers.Auction.Dto;

public class AuctionsResponse
{
    /// <summary>
    /// Название аукциона
    /// </summary>
    public string? Name { get; init; }
    
    /// <summary>
    /// Описание аукциона
    /// </summary>
    public string? Description { get; init; }

    /// <summary>
    /// Количество лотов
    /// </summary>
    public List<LotDal> Lots { get; init; } = null!;
    
    /// <summary>
    /// Картинка аукциона
    /// </summary>
    public string? Image { get; init; }

    /// <summary>
    /// Id владельца аукциона
    /// </summary>
    public Guid? UserId { get; init; } = null!;
    
    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    public DateTime DateStart { get; init; }

    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    public DateTime DateEnd { get; init; }

    /// <summary>
    /// Статус аукциона
    /// </summary>
    public AuctionStatus Status { get; init; }
}