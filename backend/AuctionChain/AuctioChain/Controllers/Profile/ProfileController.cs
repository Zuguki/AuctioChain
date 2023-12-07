using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Profile;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Profile;

[ApiController]
[Route("api/v1/profiles")]
public class ProfileController : ControllerBase
{
    private readonly IProfileManager _profileManager;

    public ProfileController(IProfileManager profileManager)
    {
        _profileManager = profileManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserByIdAsync([FromQuery] GetProfileRequest request)
    {
        if (request.UserId is null)
            request.UserId = HttpContext.TryGetUserId();
        
        var result = await _profileManager.GetProfileByUserId((Guid) request.UserId!);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }

    [HttpGet("/balance")]
    [Authorize]
    public async Task<IActionResult> GetUserBalanceAsync()
    {
        var userId = (Guid) HttpContext.TryGetUserId()!;

        var result = await _profileManager.GetUserBalance(userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok(result.Value);
    }
}