using System;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class GetAuctionByIdResponse
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    public Guid Id { get; init; }
    
    /// <summary>
    /// Название аукциона
    /// </summary>
    public string? Name { get; init; }
    
    /// <summary>
    /// Описание аукциона
    /// </summary>
    public string? Description { get; init; }

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