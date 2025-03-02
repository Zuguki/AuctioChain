using System.Collections.Generic;
using System.Text.Json.Serialization;
using AuctioChain.DAL.Models.Lot.Dto;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetWinLotsOfUserResponse
{
    /// <summary>
    /// Выйгранные лоты
    /// </summary>
    [JsonPropertyName("winLots")]
    public IEnumerable<WinLotResponse> WinLots { get; set; }
}