using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class CheckBalanceReplenishmentDto
{
    [JsonPropertyName("userId")]
    public Guid UserId { get; set; }
    
    [JsonPropertyName("walletAddress")]
    public string WalletAddress { get; set; }
    
    [JsonPropertyName("startBalanceInBlockchain")]
    public long StartBalanceInBlockchain { get; set; }
    
    [JsonPropertyName("dateSend")]
    public DateTime DateSend { get; set; }
}