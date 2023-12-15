namespace AuctioChain.DAL.Models.Lot;

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