using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Bet.Dto;

public class GetBetsByLotRequest
{
    /// <summary>
    /// Идентификатор лота
    /// </summary>
    [JsonPropertyName("lotId")]
    [Required]
    public Guid LotId { get; init; }
}