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
    private readonly IAccountManager _accountManager;

    public AccountsController(UserManager<ApplicationUser> userManager, IAccountManager accountManager)
    {
        _userManager = userManager;
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
}
