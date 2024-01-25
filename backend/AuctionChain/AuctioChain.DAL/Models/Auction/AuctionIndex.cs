using System;

namespace AuctioChain.DAL.Models.Auction;

public class AuctionIndex
{
    public Guid Id { get; init; }
    
    public string? Name { get; set; }
    
    public string? Description { get; set; }
}