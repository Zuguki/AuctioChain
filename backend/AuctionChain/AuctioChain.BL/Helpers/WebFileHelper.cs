using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace AuctioChain.BL.Helpers;

public static class WebFileHelper
{
    public static string GetWebFileName(string fileName)
    {
        var dir = GetWebFileFolder(fileName);
        CreateFolder(dir);
        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
        return $"{dir}/{fileNameWithoutExtension}.jpeg";
    }
    
    public static string GetWebFileFolder(string fileName)
    {
        var md5 = MD5.Create();
        var inputBytes = Encoding.ASCII.GetBytes(fileName);
        var hashBytes = md5.ComputeHash(inputBytes);

        var hash = Convert.ToHexString(hashBytes);

        return $"./wwwroot/images/{hash[..2]}/{hash[..4]}";
    }

    public static void CreateFolder(string dir)
    {
        if (!Directory.Exists(dir))
            Directory.CreateDirectory(dir);
    }

    public static async Task UploadAndResizeImage(Stream fileStream, string fileName, int newWidth, int newHeight)
    {
        using var image = await Image.LoadAsync(fileStream);
        
        if (image.Width / (image.Height / (float) newHeight) > newWidth)
            newHeight = (int) (image.Height / (image.Width / (float) newWidth));
        else
            newWidth = (int) (image.Width / (image.Height / (float) newHeight));
            
        image.Mutate(x => x.Resize(newWidth, newHeight, KnownResamplers.Lanczos3));
        await image.SaveAsJpegAsync(fileName, new JpegEncoder {Quality = 75});
    }
}