using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class GetLotByIdRequest
{
    /// <summary>
    /// Id лота
    /// </summary>
    [JsonPropertyName("lotId")]
    [Required]
    public Guid LotId { get; set; }
}