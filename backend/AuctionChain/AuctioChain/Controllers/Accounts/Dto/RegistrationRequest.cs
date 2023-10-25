using System.ComponentModel.DataAnnotations;

namespace AuctioChain.Controllers.Accounts.Dto;

public class RegistrationRequest
{
    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}