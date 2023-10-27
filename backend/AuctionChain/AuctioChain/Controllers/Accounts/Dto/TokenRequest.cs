using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Accounts.Dto;

public class TokenRequest
{
    [Required]
    [JsonPropertyName("accessToken")]
    public string? AccessToken { get; set; }
    
    [Required]
    [JsonPropertyName("refreshToken")]
    public string? RefreshToken { get; set; }
}