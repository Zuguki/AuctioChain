using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.Delete;

/// <summary>
/// Команда удаления аукциона
/// </summary>
public class DeleteAuctionCommand : IRequest<Result>
{
    /// <summary>
    /// Id автора аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}