using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctioChain.DAL.Models;

/// <summary>
/// Пользователь
/// </summary>
[Table("authors")]
public class Author
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    [Column("Id")]
    [Key]
    public Guid Id { get; init; }
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    [Column("name")]
    public string? Name { get; init; }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    [Column("email")]
    public string? Email { get; init; }
}