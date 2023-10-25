using System.ComponentModel.DataAnnotations;

namespace AuctioChain.Controllers.Accounts.Dto;

public class AuthResponse
{
    [EmailAddress]
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
    
    public string RefreshToken { get; set; } = null!;
}