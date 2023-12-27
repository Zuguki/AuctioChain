namespace AuctioChain.MQ.Services.Dto;

public class AuctionEndDto
{
    /// <summary>
    /// Id аукциона
    /// </summary>
    public Guid Id { get; init; }

    /// <summary>
    /// Id владельца аукциона
    /// </summary>
    public Guid? UserId { get; init; } = null!;
    
    /// <summary>
    /// Дата завершения аукциона
    /// </summary>
    public DateTime DateEnd { get; init; }
}