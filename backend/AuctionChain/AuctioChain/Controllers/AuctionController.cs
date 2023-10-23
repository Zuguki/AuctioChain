using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers;

/// <summary>
/// Контроллер для аукциона
/// </summary>
[ApiController]
[Route("api/v1/auctions")]
public class AuctionController : ControllerBase
{
    /// <summary>
    /// Создание аукциона
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateAuctionAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Отмена аукциона
    /// </summary>
    /// <param name="auctionId"></param>
    [HttpDelete]
    public async Task<IActionResult> CancelAuctionAsync([FromQuery] Guid auctionId)
    {
        return Ok();
    }

    /// <summary>
    /// Обновление аукциона
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> UpdateAuctionAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Получение всех аукционов
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAuctionsAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Получение аукциона с информацией
    /// </summary>
    /// <param name="auctionId">Id аукциона</param>
    /// <returns></returns>
    [HttpGet("details")]
    public async Task<IActionResult> GetAuctionWithDetailsAsync([FromQuery] Guid auctionId)
    {
        return Ok();
    }
}