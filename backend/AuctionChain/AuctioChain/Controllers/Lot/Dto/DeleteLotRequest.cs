using System;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.PageLot.Dto;

public class DeleteLotRequest
{
    /// <summary>
    /// Идентификатор лота
    /// </summary>
    [JsonPropertyName("lotId")]
    public Guid LotId { get; init; }
}