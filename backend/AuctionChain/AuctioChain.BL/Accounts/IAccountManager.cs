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
    Task<Result<AuthResponse>> Authenticate(AuthRequest request);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="request">Модель регистрации</param>
    Task<Result> CreateAsync(RegisterRequest request);
    
    /// <summary>
    /// Получить токен доступа и токен обновления
    /// </summary>
    /// <param name="appUser">Модель пользователя</param>
    /// <returns></returns>
    Task<Result<TokenResponse>> GetToken(ApplicationUser appUser);
}