using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class UpdateLotRequest
{
    /// <summary>
    /// Идентификатор лота
    /// </summary>
    [JsonPropertyName("lotId")]
    [Required]
    public Guid LotId { get; init; }

    /// <summary>
    /// Название лота
    /// </summary>
    [JsonPropertyName("name")]
    [Required]
    public string? Name { get; init; }

    /// <summary>
    /// Описание лота 
    /// </summary>
    [JsonPropertyName("description")]
    [Required]
    public string? Description { get; init; }
    
    /// <summary>
    /// Начальная ставка
    /// </summary>
    [JsonPropertyName("initialPrice")]
    [Required]
    public decimal InitialPrice { get; set; }
    
    /// <summary>
    /// Шаг ставки лота
    /// </summary>
    [JsonPropertyName("betStep")]
    [Required]
    public decimal BetStep { get; init; }
    
    /// <summary>
    /// Картинка лота
    /// </summary>
    [JsonPropertyName("image")]
    public string? Image { get; init; }
}