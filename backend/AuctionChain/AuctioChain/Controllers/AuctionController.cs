using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.BL;
using AuctioChain.BL.Auctions.CreateAuction;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers;

/// <summary>
/// Контроллер для аукциона
/// </summary>
[ApiController]
[Route("api/v1/auctions")]
public class AuctionController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// .ctor
    /// </summary>
    /// <param name="mediator"></param>
    public AuctionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Создание аукциона
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateAuctionAsync(CreateAuctionCommand command, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(command, cancellationToken);
        if (response.IsFailed)
            return BadRequest(string.Join(", ", response.Reasons.Select(r => r.Message)));
        
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