using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Admin.Dto;

public class SetRoleToUserRequest
{
    [JsonPropertyName("userId")]
    public Guid UserId { get; set; }

    [JsonPropertyName("role")]
    public RoleEnum Role { get; set; }
}