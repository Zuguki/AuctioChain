using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace AuctioChain.Extensions;

public static class HttpContextExtensions
{
    public static Guid? TryGetUserId(this HttpContext context)
    {
        var userClaims = context.User.Claims;
        var userId = userClaims.FirstOrDefault(t => t.Type == "userId")?.Value;
        
        if (userId is null)
            return null;
        
        return Guid.Parse(userId);
    }
}