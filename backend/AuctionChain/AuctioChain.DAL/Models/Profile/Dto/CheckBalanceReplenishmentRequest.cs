using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class CheckBalanceReplenishmentRequest
{
    [JsonPropertyName("walletAddress")]
    [Required]
    public string WalletAddress { get; set; }
}