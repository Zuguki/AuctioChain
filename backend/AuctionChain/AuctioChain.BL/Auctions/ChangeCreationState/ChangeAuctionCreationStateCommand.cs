using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.ChangeCreationState;

/// <summary>
/// Команда изменения состояния аукциона
/// </summary>
public class ChangeAuctionCreationStateCommand : IRequest<Result>
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}