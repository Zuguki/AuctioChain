using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Helpers;
using AuctioChain.DAL.Models.File.Dto;
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

    public async Task<UploadImageResponse> UploadImageAsync(IFormFile formFile)
    {
        var fileName = WebFileHelper.GetWebFileName(formFile.FileName);
        var width = _configuration.GetSection("Images:Width").Get<int>();
        var height = _configuration.GetSection("Images:Height").Get<int>();

        await WebFileHelper.UploadAndResizeImage(formFile.OpenReadStream(), fileName, width, height);

        var uri = $"http://localhost:5121/{string.Join('/', fileName.Split('/').Skip(2))}";
        return new UploadImageResponse {FileName = uri};
    }
}