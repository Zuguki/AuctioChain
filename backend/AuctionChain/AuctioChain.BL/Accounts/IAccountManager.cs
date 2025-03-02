using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Account.Dto;
using AuctioChain.DAL.Models.Admin.Dto;
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
    /// <param name="role">Роль</param>
    Task<Result> CreateMemberAsync(RegisterRequest request, RoleEnum role = RoleEnum.Member);
    
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

    /// <summary>
    /// Получить роль пользователя.
    /// </summary>
    /// <param name="request">Id пользователя.</param>
    Task<Result<RoleResponse>> GetUserRoleAsync(Guid request);
}