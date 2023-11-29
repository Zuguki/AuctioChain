using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Files;
using AuctioChain.DAL.Models.Files.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Image;

[ApiController]
[Route("api/v1/images")]
public class ImageController : ControllerBase
{
    private readonly IImageManager _imageManager;

    public ImageController(IImageManager imageManager)
    {
        _imageManager = imageManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadImageAsync(IFormFile file)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var response = await _imageManager.UploadImage(file);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetImageAsync([FromQuery] GetImageRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");
        
        var result = await _imageManager.GetImage(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return File(result.Value, "image/jpeg");
    }
}