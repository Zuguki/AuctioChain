using System;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Bets;
using AuctioChain.DAL.Models.Bet.Dto;
using AuctioChain.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Bet;

/// <summary>
/// Контроллер для ставок
/// </summary>
[ApiController]
[Route("api/v1/auction/lots/bets")]
public class BetsController : ControllerBase
{
    private readonly IBetManager _betManager;

    public BetsController(IBetManager betManager)
    {
        _betManager = betManager;
    }

    /// <summary>
    /// Сделать ставку
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DoBetAsync([FromBody] DoBetRequest request)
    {
        if (request.LotId == Guid.Empty)
            return BadRequest("Передан некорректный формат данных");
        
        var userId = HttpContext.TryGetUserId();
        if (userId is null)
            return Unauthorized();

        var result = await _betManager.CreateAsync(request, (Guid) userId);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
    
    /// <summary>
    /// Получить все ставки по лоту
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetBetsByLotAsync([FromQuery] GetBetsByLotRequest request)
    {
        if (request.LotId == Guid.Empty)
            return BadRequest("Передан некорректный формат данных");

        var result = await _betManager.GetBetsByLotAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok(result.Value);
    }
}