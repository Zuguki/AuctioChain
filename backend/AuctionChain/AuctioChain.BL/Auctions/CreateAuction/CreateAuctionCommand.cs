using System;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.CreateAuction;

/// <summary>
/// Команда для создания аукциона
/// </summary>
public class CreateAuctionCommand : IRequest<Result>
{
    /// <summary>
    /// Название аукциона
    /// </summary>
    [JsonPropertyName("name")]
    public string? Name { get; init; }

    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    [JsonPropertyName("dateStart")]
    public DateTime DateStart { get; init; }

    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    [JsonPropertyName("dateEnd")]
    public DateTime DateEnd { get; init; }
}