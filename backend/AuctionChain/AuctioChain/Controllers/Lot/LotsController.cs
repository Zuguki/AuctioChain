using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Lots;
using AuctioChain.Controllers.PageLot.Dto;
using AuctioChain.DAL.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.PageLot;

/// <summary>
/// Контроллер для лотов
/// </summary>
[ApiController]
[Route("api/v1/auction/lots")]
public class LotsController : ControllerBase
{
    private readonly ILotManager _lotManager;
    private readonly IMapper _mapper;

    public LotsController(ILotManager lotManager, IMapper mapper)
    {
        _lotManager = lotManager;
        _mapper = mapper;
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
        
        if (request.BuyoutPrice <= 0m)
            return BadRequest("Стоимость выкупа не может быть меньше или равна нуля");
        
        if (string.IsNullOrWhiteSpace(request.Code))
            return BadRequest("Передан пустой код");
        
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Передано пустое название лота");
        
        if (string.IsNullOrWhiteSpace(request.Description))
            return BadRequest("Передано пустое описание лота");

        var lot = _mapper.Map<LotDal>(request);
        var result = await _lotManager.CreateAsync(lot);
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

        var result = await _lotManager.DeleteAsync(request.LotId);
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
        
        if (request.BuyoutPrice <= 0m)
            return BadRequest("Стоимость выкупа не может быть меньше или равна нуля");
        
        if (string.IsNullOrWhiteSpace(request.Code))
            return BadRequest("Передан пустой код");
        
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Передано пустое название лота");
        
        if (string.IsNullOrWhiteSpace(request.Description))
            return BadRequest("Передано пустое описание лота");

        var model = _mapper.Map<LotDal>(request);
        var result = await _lotManager.UpdateAsync(model);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Получение списка лотов по идентификатору аукциона
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetLotsByAuctionIdAsync([FromQuery] GetLotsRequest? request)
    {
        if (request is null || request.AuctionId == Guid.Empty)
            return BadRequest("Передан некорректный идентификатор ауцкиона");

        var result = await _lotManager.GetByIdAsync(request.AuctionId);
        var responseList = result.Value.ToList();
        var response = new GetLotsResponse {Lots = responseList};
        return Ok(response);
    }
}