using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Accounts;
using AuctioChain.BL.Extensions;
using AuctioChain.Controllers.Accounts.Dto;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.Controllers.Accounts;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly IAccountManager _accountManager;

    public AccountsController(UserManager<ApplicationUser> userManager, DataContext context, ITokenService tokenService, IConfiguration configuration, IAccountManager accountManager)
    {
        _userManager = userManager;
        _context = context;
        _tokenService = tokenService;
        _configuration = configuration;
        _accountManager = accountManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");
        
        var appUser = await _userManager.FindByEmailAsync(request.Email);
        if (appUser == null)
            return BadRequest("Не верные данные");
        
        var isPasswordValid = await _userManager.CheckPasswordAsync(appUser, request.Password);
        if (!isPasswordValid)
            return BadRequest("Не верные данные");

        var result = await _accountManager.GetToken(appUser);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok(new AuthResponse {Token = result.Value.AccessToken, RefreshToken = result.Value.RefreshToken});
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");
        
        var appUser = new ApplicationUser {Email = request.Email, UserName = request.Email};
        var result = await _accountManager.CreateAsync(appUser, request.Password);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }
    
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenRequest request)
    {
        var accessToken = request.AccessToken;
        var refreshToken = request.RefreshToken;
        var principal = _configuration.GetPrincipalFromExpiredToken(accessToken);
        
        if (principal is null)
            return BadRequest("Invalid access token or refresh token");
        
        var username = principal.Identity!.Name;
        if (username is null)
            return BadRequest("Не найденно имя пользователя");
        
        var user = await _userManager.FindByNameAsync(username);
        if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            return BadRequest("Invalid access token or refresh token");

        var newAccessToken = _configuration.CreateToken(principal.Claims.ToList());
        var newRefreshToken = _configuration.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _userManager.UpdateAsync(user);

        return Ok(new TokenResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                RefreshToken = newRefreshToken
            });
    }
    
    [Authorize]
    [HttpPost("revoke/{username}")]
    public async Task<IActionResult> Revoke(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null) 
            return BadRequest("Invalid user name");

        user.RefreshToken = null;
        await _userManager.UpdateAsync(user);

        return Ok();
    }
    
    [Authorize]
    [HttpPost("revoke-all")]
    public async Task<IActionResult> RevokeAll()
    {
        var users = _userManager.Users.ToList();
        foreach (var user in users)
        {
            user.RefreshToken = null;
            await _userManager.UpdateAsync(user);
        }

        return Ok();
    }
}
