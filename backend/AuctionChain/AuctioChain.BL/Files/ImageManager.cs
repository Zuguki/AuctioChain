using System.Threading.Tasks;
using AuctioChain.BL.Helpers;
using AuctioChain.DAL.Models.Files.Dto;
using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.BL.Files;

public class ImageManager : IImageManager
{
    private readonly IConfiguration _configuration;

    public ImageManager(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<UploadImageResponse> UploadImage(IFormFile formFile)
    {
        var fileName = WebFileHelper.GetWebFileName(formFile.FileName);
        var width = _configuration.GetSection("Images:Width").Get<int>();
        var height = _configuration.GetSection("Images:Height").Get<int>();
        
        await WebFileHelper.UploadAndResizeImage(formFile.OpenReadStream(), fileName, width, height);
        return new UploadImageResponse {FileName = fileName};
    }

    public async Task<Result<byte[]>> GetImage(GetImageRequest request)
    {
        var file = await WebFileHelper.GetFileByName(request.FileName);
        if (file is null)
            return Result.Fail("Файл не найден");

        return Result.Ok(file);
    }
}