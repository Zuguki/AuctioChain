using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.GetById;

/// <summary>
/// Команда для получения аукциона
/// </summary>
public class GetAuctionByIdCommand : IRequest<Result<Auction>>
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}