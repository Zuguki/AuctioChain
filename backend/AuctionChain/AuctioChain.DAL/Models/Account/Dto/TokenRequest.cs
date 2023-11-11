using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class TokenRequest
{
    [Required]
    [JsonPropertyName("accessToken")]
    public string? AccessToken { get; set; }
    
    [Required]
    [JsonPropertyName("refreshToken")]
    public string? RefreshToken { get; set; }
}