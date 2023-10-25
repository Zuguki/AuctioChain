using System;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.DAL.EF.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
}