using System;
using System.Threading.Tasks;
using AuctioChain.DAL.Models.Admin.Dto;
using FluentResults;

namespace AuctioChain.BL.Admin;

public interface IAdminManager
{
    Task<Result<GetUserRolesResponse>> GetUserRoles(Guid userId);

    Task<Result> SetRoleToUser(SetRoleToUserRequest request);
}