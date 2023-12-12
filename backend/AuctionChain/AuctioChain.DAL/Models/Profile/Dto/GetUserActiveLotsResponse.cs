using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models.Lot.Dto;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetUserActiveLotsResponse
{
    /// <summary>
    /// Лоты в которых участвует
    /// </summary>
    [JsonPropertyName("activeLots")]
    public IEnumerable<LotResponse> ActiveLots { get; set; }
}