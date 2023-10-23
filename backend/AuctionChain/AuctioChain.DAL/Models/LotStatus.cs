namespace AuctioChain.DAL.Models;

/// <summary>
/// Статус лота
/// </summary>
public enum LotStatus
{
    /// <summary>
    /// Идут торги
    /// </summary>
    Binding = 0,
    
    /// <summary>
    /// Торги завершены
    /// </summary>
    Complete = 1,
}