using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Bet.Dto;

public class GetBetsByLotResponse
{
    [JsonPropertyName("bets")]
    public IEnumerable<BetResponse> Bets { get; set; }
}