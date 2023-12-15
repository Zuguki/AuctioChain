using System.Threading.Tasks;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Account.Dto;
using FluentResults;

namespace AuctioChain.BL.Accounts;

public interface IAccountManager
{
    /// <summary>
    /// Авторизоваться
    /// </summary>
    /// <param name="request">Модель авторизации</param>
    Task<Result<AuthResponse>> AuthenticateAsync(AuthRequest request);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="request">Модель регистрации</param>
    Task<Result> CreateMemberAsync(RegisterRequest request);
    
    /// <summary>
    /// Получить токен доступа и токен обновления
    /// </summary>
    /// <param name="appUser">Модель пользователя</param>
    Task<Result<TokenResponse>> CreateTokenAsync(ApplicationUser appUser);

    /// <summary>
    /// Обнавляет access and refresh token
    /// </summary>
    /// <param name="request">Модель refresh токена</param>
    Task<Result<RefreshResponse>> RefreshTokenAsync(RefreshRequest request);
}