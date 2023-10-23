using System;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Пользователь
/// </summary>
public class User
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid Id { get; init; }
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string? Name { get; init; }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string? Email { get; init; }
}