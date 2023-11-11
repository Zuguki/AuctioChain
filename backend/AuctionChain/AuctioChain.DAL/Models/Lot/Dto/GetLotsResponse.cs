using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Lot.Dto;

public class GetLotsResponse
{
    /// <summary>
    /// Лоты по аукциону
    /// </summary>
    [JsonPropertyName("lots")]
    public IEnumerable<LotResponse> Lots { get; set; }
}