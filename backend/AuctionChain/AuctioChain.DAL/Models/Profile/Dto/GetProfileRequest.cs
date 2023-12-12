using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.Profile.Dto;

public class GetProfileRequest
{
    [JsonPropertyName("userId")]
    [Required]
    public Guid UserId { get; set; }
}