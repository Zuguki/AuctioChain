using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Account.Dto;

public class TokenResponse
{
    [JsonPropertyName("accessToken")]
    public string? AccessToken { get; set; }
    
    [JsonPropertyName("refreshToken")]
    public string? RefreshToken { get; set; }
}