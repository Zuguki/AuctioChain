﻿using System;
using System.Collections.Generic;
using AuctioChain.DAL.EF.Entities;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.Controllers.Accounts;

public interface ITokenService
{
    string CreateToken(ApplicationUser user, List<IdentityRole<Guid>> role);
}
