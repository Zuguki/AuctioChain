using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Extensions;
using AuctioChain.BL.Models;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Account;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.BL.Accounts;

public class AccountManager : IAccountManager
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;

    public AccountManager(UserManager<ApplicationUser> userManager, DataContext context, ITokenService tokenService, IConfiguration configuration)
    {
        _userManager = userManager;
        _context = context;
        _tokenService = tokenService;
        _configuration = configuration;
    }

    public async Task<Result<IEnumerable<ApplicationUser>>> GetAllAsync()
    {
        var users = (IEnumerable<ApplicationUser>) await _userManager.Users.ToListAsync();
        return Result.Ok(users);
    }

    public async Task<Result<ApplicationUser>> GetByIdAsync(Guid id)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(us => us.Id == id);
        if (user is null)
            return Result.Fail("Данный пользователь не найден");

        return Result.Ok(user);
    }

    public async Task<Result> CreateAsync(ApplicationUser appUser, string password)
    {
        var result = await _userManager.CreateAsync(appUser, password);

        if (!result.Succeeded)
            return Result.Fail(string.Join(", ", result.Errors.Select(err => err.Description)));

        var findUser = await _userManager.Users.FirstOrDefaultAsync(us => us.Email == appUser.Email);
        if (findUser is null)
            return Result.Fail($"Пользователь с {appUser.Email} не найден");

        await _userManager.AddToRoleAsync(findUser, RoleConsts.Member);
        return Result.Ok();
    }

    public async Task<Result<ApplicationUser>> GetUserByName(string name)
    {
        var user = await _userManager.FindByNameAsync(name);
        if (user is null)
            return Result.Fail("Пользователь с таким именем не найден");

        return Result.Ok(user);
    }

    public async Task<Result<TokenModel>> GetToken(ApplicationUser appUser)
    {
        var user = await _userManager.FindByEmailAsync(appUser.Email!);
        if (user is null)
            return Result.Fail("Пользователь не найден");
        
        var roleIds = await _context.UserRoles.Where(r => r.UserId == user.Id).Select(x => x.RoleId).ToListAsync();
        var roles = _context.Roles.Where(x => roleIds.Contains(x.Id)).ToList();
        
        var accessToken = _tokenService.CreateToken(user, roles);
        user.RefreshToken = _configuration.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetSection("Jwt:RefreshTokenValidityInDays").Get<int>());
        
        await _context.SaveChangesAsync();
        return Result.Ok(new TokenModel {AccessToken = accessToken, RefreshToken = user.RefreshToken});
    }
}