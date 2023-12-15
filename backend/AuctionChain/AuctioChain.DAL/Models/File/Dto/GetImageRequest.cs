using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuctioChain.DAL.Models.File.Dto;

public class GetImageRequest
{
    [Required]
    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = null!;
}