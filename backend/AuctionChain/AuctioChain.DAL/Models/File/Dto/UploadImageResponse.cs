using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.File.Dto;

public class UploadImageResponse
{
    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = null!;
}