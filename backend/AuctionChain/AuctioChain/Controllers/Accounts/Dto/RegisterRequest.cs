using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Accounts.Dto;

public class RegisterRequest
{
    [Required] 
    [EmailAddress]
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;
 
    [Required]
    [DataType(DataType.Password)]
    [JsonPropertyName("password")]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Пароль слишком простой")]
    public string Password { get; set; } = null!;

    [Required]
    [Compare(nameof(Password), ErrorMessage = "Пароли не совпадают")]
    [DataType(DataType.Password)]
    [JsonPropertyName("passwordConfirm")]
    public string PasswordConfirm { get; set; } = null!;
}