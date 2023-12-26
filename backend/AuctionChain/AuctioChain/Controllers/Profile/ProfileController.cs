using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AuctioChain.BL.Balance;
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

    [HttpGet("userName")]
    public async Task<IActionResult> GetUserByIdAsync([FromQuery] GetProfileRequest request)
    {
        var result = await _profileManager.GetProfileByUserIdAsync(request.UserId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }


    [HttpGet("auctions")]
    public async Task<IActionResult> GetUserAuctionsAsync([FromQuery] GetUserAuctionsRequest request)
    {
        var result = await _profileManager.GetUserAuctionsAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }

    [HttpGet("winLots")]
    public async Task<IActionResult> GetUserWinLotsAsync([FromQuery] GetWinLotsOfUserRequest request)
    {
        var result = await _profileManager.GetWinLotsOfUserAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }
    
    [HttpGet("activeLots")]
    public async Task<IActionResult> GetUserActiveLotsAsync([FromQuery] GetUserActiveLotsRequest request)
    {
        var result = await _profileManager.GetUserActiveLotsAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }
}