using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Extensions;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Account.Dto;
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

    public async Task<Result<AuthResponse>> Authenticate(AuthRequest request)
    {
        var appUserEmail = await _userManager.FindByEmailAsync(request.Login);
        var appUserUserName = await _userManager.FindByNameAsync(request.Login);
        
        if (appUserEmail is null && appUserUserName is null)
            return Result.Fail("Email или пароль не верны");

        var appUser = appUserEmail ?? appUserUserName;
        
        var isPasswordValid = await _userManager.CheckPasswordAsync(appUser!, request.Password);
        if (!isPasswordValid)
            return Result.Fail("Email или пароль не верны");

        var result = await CreateToken(appUser!);
        if (result.IsFailed)
            return Result.Fail(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Result.Ok(new AuthResponse {Token = result.Value.AccessToken, RefreshToken = result.Value.RefreshToken});
    }

    public async Task<Result> CreateMemberAsync(RegisterRequest request)
    {
        var appUser = new ApplicationUser {Email = request.Email, UserName = request.UserName};
        var result = await _userManager.CreateAsync(appUser, request.Password);

        if (!result.Succeeded)
            return Result.Fail(string.Join(", ", result.Errors.Select(err => err.Description)));

        var findUser = await _userManager.Users.FirstOrDefaultAsync(us => us.Email == appUser.Email);
        if (findUser is null)
            return Result.Fail($"Пользователь с {appUser.Email} не найден");

        await _userManager.AddToRoleAsync(findUser, RoleConsts.Member);
        return Result.Ok();
    }

    public async Task<Result<TokenResponse>> CreateToken(ApplicationUser appUser)
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
        return Result.Ok(new TokenResponse {AccessToken = accessToken, RefreshToken = user.RefreshToken});
    }

    public async Task<Result<RefreshResponse>> RefreshToken(RefreshRequest request)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(appUser =>
            appUser.RefreshToken == request.RefreshToken);

        if (user is null)
            return Result.Fail("Refresh token не действителен");

        var token = await CreateToken(user);
        if (token.IsFailed)
            return Result.Fail(string.Join(", ", token.Reasons.Select(r => r.Message)));

        return Result.Ok(new RefreshResponse {Token = token.Value.AccessToken, RefreshToken = token.Value.RefreshToken});
    }
}