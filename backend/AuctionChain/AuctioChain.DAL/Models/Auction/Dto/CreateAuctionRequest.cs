﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Auction.Dto;

public class CreateAuctionRequest
{
    /// <summary>
    /// Название аукциона
    /// </summary>
    [JsonPropertyName("name")]
    [Required]
    public string? Name { get; init; }
    
    /// <summary>
    /// Описание аукциона
    /// </summary>
    [JsonPropertyName("description")]
    public string? Description { get; init; }
    
    /// <summary>
    /// Картинка аукциона
    /// </summary>
    [JsonPropertyName("image")]
    public string? Image { get; init; }

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