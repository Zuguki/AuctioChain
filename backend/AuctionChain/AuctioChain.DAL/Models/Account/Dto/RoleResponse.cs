using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Account.Dto;

public class RoleResponse
{
    [JsonPropertyName("roles")]
    public List<string> Roles { get; set; }
}