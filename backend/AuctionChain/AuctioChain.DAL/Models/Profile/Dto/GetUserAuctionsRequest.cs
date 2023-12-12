using System;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetUserAuctionsRequest
{
    public Guid? UserId { get; set; }
    
    public int Page { get; set; } = 1;

    public int ItemsPerPage { get; set; } = 25;
}