﻿using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Accounts;
using AuctioChain.DAL.Models.Account.Dto;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Account;

[ApiController]
[Route("api/v1/accounts")]
public class AccountsController : ControllerBase
{
    private readonly IAccountManager _accountManager;

    public AccountsController(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> AuthenticateAsync([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var response = await _accountManager.AuthenticateAsync(request);
        if (response.IsFailed)
            return BadRequest(string.Join(", ", response.Reasons.Select(r => r.Message)));

        return Ok(response.Value);
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");
        
        var result = await _accountManager.CreateMemberAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshAsync([FromBody] RefreshRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var response = await _accountManager.RefreshTokenAsync(request);
        if (response.IsFailed)
            return BadRequest(string.Join(", ", response.Reasons.Select(r => r.Message)));

        return Ok(response.Value);
    }
    
    [Authorize]
    [HttpGet("roles")]
    public async Task<IActionResult> GetRolesAsync()
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();
        
        var response = await _accountManager.GetUserRoleAsync(userId.Value);
        if (response.IsFailed)
            return BadRequest(string.Join(", ", response.Reasons.Select(r => r.Message)));

        return Ok(response.Value);
    }
}
