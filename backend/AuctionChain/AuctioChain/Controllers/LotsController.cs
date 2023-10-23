using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers;

/// <summary>
/// Контроллер для лотов
/// </summary>
[ApiController]
[Route("api/v1/auction/lots")]
public class LotsController : ControllerBase
{
    /// <summary>
    /// Создание лота
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateLotAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Удаление лота
    /// </summary>
    [HttpDelete]
    public async Task<IActionResult> DeleteLotAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Обновление лота
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> UpdateLotAsync()
    {
        return Ok();
    }

    /// <summary>
    /// Получение списка лотов по Id аукциона
    /// </summary>
    /// <param name="auctionId">Id аукциона</param>
    [HttpGet]
    public async Task<IActionResult> GetLotsByAuctionIdAsync([FromQuery] Guid auctionId)
    {
        return Ok();
    }
}