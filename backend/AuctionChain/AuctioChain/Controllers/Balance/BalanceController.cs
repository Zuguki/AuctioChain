using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Balance;

[ApiController]
[Route("api/v1/balance")]
public class BalanceController : ControllerBase
{
    private readonly IBalanceManager _balanceManager;

    public BalanceController(IBalanceManager balanceManager)
    {
        _balanceManager = balanceManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserBalanceAsync()
    {
        var userId = (Guid) HttpContext.TryGetUserId()!;

        var result = await _balanceManager.GetUserBalanceAsync(userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CheckBalanceReplenishmentAsync([FromBody] CheckBalanceReplenishmentRequest request)
    {
        var userId = (Guid) HttpContext.TryGetUserId()!;

        var result = await _balanceManager.CheckBalanceReplenishmentAsync(userId, request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
    
    [HttpPost("withdraw")]
    [Authorize]
    public async Task<IActionResult> WithdrawCashAsync([FromBody] WithdrawCashRequest request)
    {
        var userId = (Guid) HttpContext.TryGetUserId()!;
        var result = await _balanceManager.WithdrawAsync(userId, request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
}