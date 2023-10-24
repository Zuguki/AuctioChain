using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.Update;

/// <summary>
/// Команда обновления аукциона
/// </summary>
public class UpdateAuctionCommand : IRequest<Result>
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
    
    /// <summary>
    /// Новое название аукциона
    /// </summary>
    [JsonPropertyName("name")]
    public string? Name { get; init; }
    
    /// <summary>
    /// Новая Дата начала аукциона
    /// </summary>
    [JsonPropertyName("dateStart")]
    public DateTime DateStart { get; init; } 
    
    /// <summary>
    /// Новая Дата завершения аукциона
    /// </summary>
    [JsonPropertyName("dateEnd")]
    public DateTime DateEnd { get; init; }
}