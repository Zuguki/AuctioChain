using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class TokenResponse
{
    [JsonPropertyName("accessToken")]
    public string AccessToken { get; set; } = null!;

    [JsonPropertyName("refreshToken")]
    public string RefreshToken { get; set; } = null!;
}