using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class RefreshRequest
{
    [Required]
    [JsonPropertyName("refreshToken")]
    public string? RefreshToken { get; set; }
}