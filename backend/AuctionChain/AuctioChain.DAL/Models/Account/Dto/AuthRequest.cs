using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class AuthRequest
{
    [Required]
    [JsonPropertyName("login")]
    public string Login { get; set; } = null!;
    
    [Required]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Пароль слишком простой")]
    [DefaultValue("string")]
    [JsonPropertyName("password")]
    public string Password { get; set; } = null!;
}