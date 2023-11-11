using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.BL.Models;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Account;
using FluentResults;

namespace AuctioChain.BL.Accounts;

public interface IAccountManager
{
    /// <summary>
    /// Полуить все элементы
    /// </summary>
    Task<Result<IEnumerable<ApplicationUser>>> GetAllAsync();
    
    /// <summary>
    /// Получить модель по Id
    /// </summary>
    /// <param name="id">Id модели</param>
    Task<Result<ApplicationUser>> GetByIdAsync(Guid id);

    /// <summary>
    /// Создать модель
    /// </summary>
    /// <param name="appUser">Модель пользователя</param>
    /// <param name="password">Пароль</param>
    Task<Result> CreateAsync(ApplicationUser appUser, string password);
    
    /// <summary>
    /// Получить токен доступа и токен обновления
    /// </summary>
    /// <param name="appUser">Модель пользователя</param>
    /// <returns></returns>
    Task<Result<TokenModel>> GetToken(ApplicationUser appUser);
}