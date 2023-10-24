using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.Cancel;

/// <summary>
/// Команда для отмены аукциона
/// </summary>
public class CancelAuctionCommand : IRequest<Result>
{
    /// <summary>
    ///  Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}