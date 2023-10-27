using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuctioChain.BL.Models;
using AuctioChain.DAL.Models;
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
    /// <param name="appUser">Модель для создания</param>
    /// <param name="password">Пароль</param>
    Task<Result> CreateAsync(ApplicationUser appUser, string password);
    
    /// <summary>
    /// Получить пользователя по имени
    /// </summary>
    /// <param name="name">Имя пользователя</param>
    Task<Result<ApplicationUser>> GetUserByName(string name);

    Task<Result<TokenModel>> GetToken(ApplicationUser appUser);
}