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

    /// <summary>
    /// Аукционы пользователя
    /// </summary>
    public List<AuctionDal> MyAuctions { get; init; } = new();

    /// <summary>
    /// Ставки пользователя
    /// </summary>
    public List<BetDal> AllBets { get; init; } = new();

    /// <summary>
    /// Выйгранные лоты
    /// </summary>
    public List<LotDal> WinLots { get; set; } = new();
}