using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class RefreshResponse
{
    [JsonPropertyName("token")]
    public string Token { get; set; } = null!;
    
    [JsonPropertyName("refreshToken")]
    public string RefreshToken { get; set; } = null!;
}