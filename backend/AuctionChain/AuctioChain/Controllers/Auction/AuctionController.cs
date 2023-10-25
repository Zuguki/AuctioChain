﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Auctions;
using AuctioChain.Controllers.Auction.Dto;
using AuctioChain.DAL.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Auction;

/// <summary>
/// Контроллер для аукциона
/// </summary>
[ApiController]
[Route("api/v1/auctions")]
public class AuctionController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IAuctionManager _manager;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionController(IMapper mapper, IAuctionManager manager)
    {
        _mapper = mapper;
        _manager = manager;
    }

    /// <summary>
    /// Создание аукциона
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateAuctionAsync([FromBody] CreateAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        if (request.DateStart >= request.DateEnd)
            return BadRequest("Дата завершения аукциона должна быть больше даты начала аукциона");
        
        var auction = _mapper.Map<AuctionDal>(request);
        await _manager.CreateAsync(auction);
        return Ok();
    }

    /// <summary>
    /// Отменя аукциона
    /// </summary>
    [HttpPatch("cancel")]
    public async Task<IActionResult> CancelAuctionAsync([FromQuery] CancelAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.CancelAsync(request.AuctionId);
        
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Изменение состояния готовности аукциона
    /// </summary>
    [HttpPatch("changeCreationState")]
    public async Task<IActionResult> ChangeAuctionCreationStateAsync([FromQuery] ChangeAuctionCreationStateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.ChangeCreationStateAsync(request.AuctionId);
        
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Удаление аукциона
    /// </summary>
    [HttpDelete]
    public async Task<IActionResult> DeleteAuctionAsync([FromQuery] DeleteAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.DeleteAsync(request.AuctionId);
        
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        return Ok();
    }

    /// <summary>
    /// Обновление аукциона
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> UpdateAuctionAsync([FromBody] UpdateAuctionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var auction = _mapper.Map<AuctionDal>(request);
        var result = await _manager.UpdateAsync(auction);
        
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

        var list = new List<AuctionDal>();
        
        var result = await _manager.GetAllAsync();
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        list.AddRange(result.Value);
        var response = new GetAuctionsResponse {Auctions = list};
        
        return Ok(response);
    }

    /// <summary>
    /// Получение аукциона по Id
    /// </summary>
    [HttpGet("id")]
    public async Task<IActionResult> GetAuctionByIdAsync([FromQuery] GetAuctionByIdRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var result = await _manager.GetByIdAsync(request.AuctionId);
        
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));
        
        var response = _mapper.Map<GetAuctionByIdResponse>(result.Value);
        return Ok(response);
    }
}