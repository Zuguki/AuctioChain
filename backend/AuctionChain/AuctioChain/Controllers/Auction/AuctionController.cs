using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions.Cancel;
using AuctioChain.BL.Auctions.ChangeCreationState;
using AuctioChain.BL.Auctions.Create;
using AuctioChain.BL.Auctions.Delete;
using AuctioChain.BL.Auctions.GetAll;
using AuctioChain.BL.Auctions.GetById;
using AuctioChain.BL.Auctions.Update;
using AuctioChain.Controllers.Auction.Dto;
using AutoMapper;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Auction;

/// <summary>
/// Контроллер для аукциона
/// </summary>
[ApiController]
[Route("api/v1/auctions")]
public class AuctionController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    /// <summary>
    /// Создание аукциона
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateAuctionAsync([FromBody] CreateAuctionCommand command, CancellationToken cancellationToken)
    {
        return ConvertToActionResult(await _mediator.Send(command, cancellationToken));
    }

    /// <summary>
    /// Отменя аукциона
    /// </summary>
    /// <param name="command">Комманда отмены аукциона</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPatch("cancel")]
    public async Task<IActionResult> CancelAuctionAsync([FromQuery] CancelAuctionCommand command, CancellationToken cancellationToken)
    {
        return ConvertToActionResult(await _mediator.Send(command, cancellationToken));
    }

    /// <summary>
    /// Изменение состояния готовности аукциона
    /// </summary>
    /// <param name="command">Команда готовности аукциона</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPatch("changeCreationState")]
    public async Task<IActionResult> ChangeAuctionCreationStateAsync([FromQuery] ChangeAuctionCreationStateCommand command, CancellationToken cancellationToken)
    {
        return ConvertToActionResult(await _mediator.Send(command, cancellationToken));
    }

    /// <summary>
    /// Удаление аукциона
    /// </summary>
    /// <param name="command">Команда удаления аукциона</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpDelete]
    public async Task<IActionResult> DeleteAuctionAsync([FromQuery] DeleteAuctionCommand command, CancellationToken cancellationToken)
    {
        return ConvertToActionResult(await _mediator.Send(command, cancellationToken));
    }

    /// <summary>
    /// Обновление аукциона
    /// </summary>
    /// <param name="command">Команда для обновления аукциона</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpPut]
    public async Task<IActionResult> UpdateAuctionAsync([FromBody] UpdateAuctionCommand command, CancellationToken cancellationToken)
    {
        return ConvertToActionResult(await _mediator.Send(command, cancellationToken));
    }

    /// <summary>
    /// Получение всех аукционов
    /// </summary>
    /// <param name="query">Запрос на получение аукционов</param>
    /// <param name="cancellationToken">Токен отмены</param>
    [HttpGet]
    public async Task<IActionResult> GetAuctionsAsync(GetAuctionsQuery query, CancellationToken cancellationToken)
    {
        var result = new List<GetAuctionResponse>();
        var auctions = await _mediator.Send(query, cancellationToken);
        
        if (auctions.IsFailed)
            return BadRequest(string.Join(", ", auctions.Reasons.Select(r => r.Message)));

        foreach (var auction in auctions.Value)
        {
            var responseModel = _mapper.Map<DAL.Models.Auction, GetAuctionResponse>(auction);
            result.Add(responseModel);
        }

        return Ok(result);
    }

    /// <summary>
    /// Получение аукциона по Id
    /// </summary>
    /// <param name="command">Комманда для получения аукциона</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    [HttpGet("id")]
    public async Task<IActionResult> GetAuctionByIdAsync([FromQuery] GetAuctionByIdCommand command, CancellationToken cancellationToken)
    {
        var auction = await _mediator.Send(command, cancellationToken);
        if (auction.IsFailed)
            return BadRequest(string.Join(", ", auction.Reasons.Select(r => r.Message)));

        var responseModel = _mapper.Map<DAL.Models.Auction, GetAuctionResponse>(auction.Value);
        return Ok(responseModel);
    }

    private IActionResult ConvertToActionResult(ResultBase result)
    {
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }
}