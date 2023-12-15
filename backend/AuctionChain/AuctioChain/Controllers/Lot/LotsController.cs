using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AuctioChain.BL.Lots;
using AuctioChain.DAL.Models.Lot.Dto;
using AuctioChain.DAL.Models.Pagination;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Lot;

/// <summary>
/// Контроллер для лотов
/// </summary>
[ApiController]
[Route("api/v1/auction/lots")]
public class LotsController : ControllerBase
{
    private readonly ILotManager _lotManager;

    public LotsController(ILotManager lotManager)
    {
        _lotManager = lotManager;
    }

    /// <summary>
    /// Создать лот
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateLotAsync([FromBody] CreateLotRequest request)
    {
        if (request.AuctionId == Guid.Empty)
            return BadRequest("Передан некорректный идентификатор аукциона");
        
        if (request.BetStep <= 0m)
            return BadRequest("Шаг ставки не может быть меньше или равен нуля");

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Передано пустое название лота");

        if (string.IsNullOrWhiteSpace(request.Description))
            return BadRequest("Передано пустое описание лота");

        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _lotManager.CreateAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }

    /// <summary>
    /// Удалить лот
    /// </summary>
    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteLotAsync([FromQuery] DeleteLotRequest request)
    {
        if (request.LotId == Guid.Empty)
            return BadRequest("Передан некорректный идентификатор лота");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _lotManager.DeleteAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }

    /// <summary>
    /// Обновить лот
    /// </summary>
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateLotAsync([FromBody] UpdateLotRequest request)
    {
        if (request.LotId == Guid.Empty)
            return BadRequest("Передан некорректный идентификатор лота");

        if (request.BetStep <= 0m)
            return BadRequest("Шаг ставки не может быть меньше или равен нуля");

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Передано пустое название лота");

        if (string.IsNullOrWhiteSpace(request.Description))
            return BadRequest("Передано пустое описание лота");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _lotManager.UpdateAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }

    /// <summary>
    /// Получение списка лотов по идентификатору аукциона
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetLotsByAuctionIdAsync([FromQuery] GetLotsRequest request, [FromQuery] PaginationRequest pagination)
    {
        if (!ModelState.IsValid)
            return BadRequest("Передан некорректный идентификатор ауцкиона");
        
        var result = await _lotManager.GetByIdAsync(request, pagination);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }

    /// <summary>
    /// Получение лота по id
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetLotByIdAsync([FromRoute] Guid id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Передан некорректный идентификатор лота");

        var result = await _lotManager.GetLotByIdAsync(id);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }
}