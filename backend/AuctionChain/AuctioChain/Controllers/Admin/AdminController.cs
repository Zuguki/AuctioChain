using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuctioChain.BL.Admin;
using AuctioChain.DAL.Models.Admin.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Admin;

[ApiController]
[Route("api/v1/admins")]
public class AdminController : ControllerBase
{
    private readonly IAdminManager _adminManager;

    public AdminController(IAdminManager adminManager)
    {
        _adminManager = adminManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserRolesAsync([FromQuery] Guid userId)
    {
        if (!User.HasClaim(ClaimTypes.Role, RoleEnum.Administrator.ToString()))
            return Unauthorized();
        
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");
        
        var result = await _adminManager.GetUserRoles(userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SetUserRoleAsync([FromBody] SetRoleToUserRequest request)
    {
        if (!User.HasClaim(ClaimTypes.Role, RoleEnum.Administrator.ToString()))
            return Unauthorized();
        
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");
        
        var result = await _adminManager.SetRoleToUser(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
}