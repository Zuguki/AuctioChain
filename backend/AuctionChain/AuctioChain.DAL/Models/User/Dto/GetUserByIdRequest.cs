using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.User.Dto;

public class GetUserByIdRequest
{
    [JsonPropertyName("userId")]
    [Required]
    public Guid UserId { get; init; }
}