using System;
using System.Collections.Generic;
using AuctioChain.DAL.Models;

namespace AuctioChain.Controllers.Auction.Dto;

public class GetAuctionByIdResponse
{
    /// <summary>
    /// Название аукциона
    /// </summary>
    public string? Name { get; init; }

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