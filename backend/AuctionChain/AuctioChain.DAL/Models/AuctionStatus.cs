namespace AuctioChain.DAL.Models;

public enum AuctionStatus
{
    /// <summary>
    /// Неизвестный статус
    /// </summary>
    Unknown = 0,
    
    /// <summary>
    /// Этап создания аукциона
    /// </summary>
    Creation = 1,
    
    /// <summary>
    /// Этап ожидание торгов
    /// </summary>
    WaitBidding = 2,
    
    /// <summary>
    /// Этап торгов
    /// </summary>
    Bidding = 3,
    
    /// <summary>
    /// Аукцион завершен
    /// </summary>
    Complete = 4,
    
    /// <summary>
    /// Аукцион отменен
    /// </summary>
    Canceled = 5,
}