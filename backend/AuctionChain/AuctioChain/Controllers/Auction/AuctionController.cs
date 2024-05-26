using System;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions;
using AuctioChain.DAL.Models.Admin.Dto;
using AuctioChain.DAL.Models.Auction.Dto;
using AuctioChain.DAL.Models.Pagination;
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
            return BadRequest("Переданы некорректные данные");

        if (request.DateStart >= request.DateEnd)
            return BadRequest("Дата завершения аукциона должна быть больше даты начала аукциона");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _manager.CreateAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }

    /// <summary>
    /// Отменя аукциона
    /// </summary>
    [HttpPatch("cancel/{id:guid}")]
    [Authorize]
    public async Task<IActionResult> CancelAuctionAsync([FromRoute] Guid id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");

        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();
        
        var result = await _manager.CancelAsync(id, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Изменение состояния готовности аукциона
    /// </summary>
    [HttpPatch("changeCreationState/{id:guid}")]
    [Authorize]
    public async Task<IActionResult> ChangeAuctionCreationStateAsync([FromRoute] Guid id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");

        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();
        
        var result = await _manager.ChangeCreationStateAsync(id, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Удаление аукциона
    /// </summary>
    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteAuctionAsync([FromRoute] Guid id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _manager.DeleteAsync(id, (Guid) userId);
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
            return BadRequest("Переданы некорректные данные");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _manager.UpdateAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Получение всех аукционов
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAuctionsAsync([FromQuery] PaginationRequest pagination, [FromQuery] GetAuctionsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");
        
        var result = await _manager.GetAllAsync(pagination, request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }

    /// <summary>
    /// Получение аукциона по Id
    /// </summary>
    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> GetAuctionByIdAsync([FromRoute (Name = "id")] Guid id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");

        var result = await _manager.GetByIdAsync(id);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }

    /// <summary>
    /// Подтвердить аукцион
    /// </summary>
    [HttpPatch("approve/{auctionId:guid}")]
    [Authorize]
    public async Task<IActionResult> ApproveAuctionByIdAsync([FromRoute] Guid auctionId)
    {
        if (!User.HasClaim(ClaimTypes.Role, RoleEnum.Moderator.ToString()) &&
            !User.HasClaim(ClaimTypes.Role, RoleEnum.Administrator.ToString()))
            return Unauthorized();
        
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _manager.ApproveByIdAsync(auctionId, userId.Value);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
    
    /// <summary>
    /// Получить все аукциона на поддтверждение
    /// </summary>
    [HttpGet("approve")]
    [Authorize]
    public async Task<IActionResult> GetAllForApproveAsync([FromQuery] PaginationRequest pagination)
    {
        if (!User.HasClaim(ClaimTypes.Role, RoleEnum.Moderator.ToString()) &&
            !User.HasClaim(ClaimTypes.Role, RoleEnum.Administrator.ToString()))
            return Unauthorized();
        
        if (!ModelState.IsValid)
            return BadRequest("Переданы некорректные данные");

        var result = await _manager.GetAllAuctionsForApproveAsync(pagination);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Value.Item2));
        return Ok(result.Value.Item1);
    }
}