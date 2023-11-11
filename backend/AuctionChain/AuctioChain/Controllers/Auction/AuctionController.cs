using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Auction;

/// <summary>
/// Контроллер для аукциона
/// </summary>
[ApiController]
[Route("api/v1/auctions")]
public class AuctionController : ControllerBase
{
    private readonly IAuctionManager _manager;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionController(IAuctionManager manager)
    {
        _manager = manager;
    }

    /// <summary>
    /// Создание аукциона
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAuctionAsync([FromBody] CreateAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        if (request.DateStart >= request.DateEnd)
            return BadRequest("Дата завершения аукциона должна быть больше даты начала аукциона");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        await _manager.CreateAsync(request, (Guid) userId);
        return Ok();
    }

    /// <summary>
    /// Отменя аукциона
    /// </summary>
    [HttpPatch("cancel")]
    [Authorize]
    public async Task<IActionResult> CancelAuctionAsync([FromQuery] CancelAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.CancelAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Изменение состояния готовности аукциона
    /// </summary>
    [HttpPatch("changeCreationState")]
    [Authorize]
    public async Task<IActionResult> ChangeAuctionCreationStateAsync([FromQuery] ChangeAuctionCreationStateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.ChangeCreationStateAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Удаление аукциона
    /// </summary>
    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteAuctionAsync([FromQuery] DeleteAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.DeleteAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Обновление аукциона
    /// </summary>
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateAuctionAsync([FromBody] UpdateAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.UpdateAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Получение всех аукционов
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAuctionsAsync()
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.GetAllAsync();
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok(result.Value);
    }

    /// <summary>
    /// Получение аукциона по Id
    /// </summary>
    [HttpGet("id")]
    public async Task<IActionResult> GetAuctionByIdAsync([FromQuery] GetAuctionByIdRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.GetByIdAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }
}