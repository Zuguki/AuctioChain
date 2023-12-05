using System;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetProfileRequest
{
    [JsonPropertyName("userId")]
    public Guid? UserId { get; init; }
}