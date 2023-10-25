using System.ComponentModel.DataAnnotations;

namespace AuctioChain.Controllers.Accounts.Dto;

public class RegisterRequest
{
    [Required] 
    [EmailAddress]
    public string Email { get; set; } = null!;
 
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;

    [Required]
    [Compare(nameof(Password), ErrorMessage = "Пароли не совпадают")]
    [DataType(DataType.Password)]
    public string PasswordConfirm { get; set; } = null!;
}