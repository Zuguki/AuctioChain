using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using AuctioChain.BL.Extensions;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.BL.Accounts;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(ApplicationUser user, List<IdentityRole<Guid>> roles)
    {
        var token = user
            .CreateClaims(roles)
            .CreateJwtToken(_configuration);
        
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}
