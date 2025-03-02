using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Admin.Dto;

public class GetUserRolesResponse
{
    [JsonPropertyName("roles")]
    public List<string> Roles { get; set; }
}