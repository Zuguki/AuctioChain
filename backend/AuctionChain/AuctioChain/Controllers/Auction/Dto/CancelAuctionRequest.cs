﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Auction.Dto;

public class CancelAuctionRequest
{
    /// <summary>
    ///  Id аукциона
    /// </summary>
    [JsonPropertyName("auctionId")]
    [Required]
    public Guid AuctionId { get; init; }
}