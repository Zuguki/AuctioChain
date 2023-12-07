using System;
using System.Collections.Generic;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Bet;
using AuctioChain.DAL.Models.Lot;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.DAL.Models.Account;

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
    /// Баланс аккаунта
    /// </summary>
    public decimal Balance { get; set; }
}