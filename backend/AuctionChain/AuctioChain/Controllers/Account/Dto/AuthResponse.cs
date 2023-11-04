﻿using System.Text.Json.Serialization;

namespace AuctioChain.Controllers.Account.Dto;

public class AuthResponse
{
    [JsonPropertyName("token")]
    public string Token { get; set; } = null!;
    
    [JsonPropertyName("refreshToken")]
    public string RefreshToken { get; set; } = null!;
}