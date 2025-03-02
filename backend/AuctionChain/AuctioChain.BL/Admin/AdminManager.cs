using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Admin.Dto;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace AuctioChain.BL.Admin;

public class AdminManager : IAdminManager
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AdminManager(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<GetUserRolesResponse>> GetUserRoles(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var roles = await _userManager.GetRolesAsync(user);
        return Result.Ok(new GetUserRolesResponse { Roles = roles.ToList() });
    }

    public async Task<Result> SetRoleToUser(SetRoleToUserRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (user is null)
            return Result.Fail("Пользователь не найден");

        var roles = await _userManager.GetRolesAsync(user);
        if (roles.Contains(request.Role.ToString()))
            return Result.Ok();

        await _userManager.AddToRoleAsync(user, request.Role.ToString());
        return Result.Ok();
    }
}