using System;
using System.Collections.Generic;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Account;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.BL.Accounts;

public interface ITokenService
{
    string CreateToken(ApplicationUser user, List<IdentityRole<Guid>> role);
}
