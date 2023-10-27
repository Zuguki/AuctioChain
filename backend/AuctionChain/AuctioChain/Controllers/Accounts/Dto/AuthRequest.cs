using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Accounts.Dto;

public class AuthRequest
{
    [EmailAddress]
    [Required]
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;
    
    [Required]
    [JsonPropertyName("password")]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Пароль слишком простой")]
    public string Password { get; set; } = null!;
}