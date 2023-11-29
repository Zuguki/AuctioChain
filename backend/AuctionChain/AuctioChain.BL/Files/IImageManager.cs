using System.Threading.Tasks;
using AuctioChain.DAL.Models.Files.Dto;
using FluentResults;
using Microsoft.AspNetCore.Http;

namespace AuctioChain.BL.Files;

public interface IImageManager
{
    Task<UploadImageResponse> UploadImage(IFormFile formFile);

    Task<Result<byte[]>> GetImage(GetImageRequest request);
}