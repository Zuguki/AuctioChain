using System.Threading.Tasks;
using AuctioChain.DAL.Models.File.Dto;
using FluentResults;
using Microsoft.AspNetCore.Http;

namespace AuctioChain.BL.Files;

public interface IImageManager
{
    Task<UploadImageResponse> UploadImageAsync(IFormFile formFile);
}