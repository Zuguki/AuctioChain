using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.DAL.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    /// <summary>
    /// Токен обновления JWT
    /// </summary>
    public string? RefreshToken { get; set; }
    
    /// <summary>
    /// Дата обновления Refresh токена
    /// </summary>
    public DateTime RefreshTokenExpiryTime { get; set; }

    /// <summary>
    /// Аукционы
    /// </summary>
    public List<AuctionDal>? Auctions { get; set; }
}