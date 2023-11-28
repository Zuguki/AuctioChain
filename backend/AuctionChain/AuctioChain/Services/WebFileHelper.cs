using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AuctioChain.Services;

public static class WebFileHelper
{
    public static string GetWebFileName(string fileName)
    {
        var dir = GetWebFileFolder(fileName);
        CreateFolder(dir);
        return $"{dir}/{fileName}";
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
}