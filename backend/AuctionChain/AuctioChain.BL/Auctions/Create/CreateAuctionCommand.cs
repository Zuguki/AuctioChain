using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.Create;

/// <summary>
/// Команда для создания аукциона
/// </summary>
public class CreateAuctionCommand : IRequest<Result>
{
    /// <summary>
    /// Название аукциона
    /// </summary>
    [JsonPropertyName("name")]
    [Required]
    public string? Name { get; init; }

    /// <summary>
    /// Дата начала аукциона
    /// </summary>
    [JsonPropertyName("dateStart")]
    [Required]
    public DateTime DateStart { get; init; }

    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    [JsonPropertyName("dateEnd")]
    [Required]
    public DateTime DateEnd { get; init; }
}