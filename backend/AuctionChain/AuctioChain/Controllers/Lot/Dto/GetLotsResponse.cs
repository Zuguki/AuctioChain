using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models;

namespace AuctioChain.Controllers.PageLot.Dto;

public class GetLotsResponse
{
    /// <summary>
    /// Лоты по аукциону
    /// </summary>
    [JsonPropertyName("lots")]
    public IEnumerable<LotDal> Lots { get; set; }
}