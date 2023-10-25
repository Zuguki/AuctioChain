﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions;

/// <inheritdoc />
public class AuctionManager : IAuctionManager
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public AuctionManager(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public Task<Result<IEnumerable<AuctionDal>>> GetAllAsync()
    {
        var result = (IEnumerable<AuctionDal>) _context.Auctions.ToList();
        return Task.FromResult(Result.Ok(result));
    }

    /// <inheritdoc />
    public async Task<Result<AuctionDal>> GetByIdAsync(Guid id)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == id);
        if (auction is null)
            return Result.Fail("Аукцион не найден");

        return Result.Ok(auction);
    }

    /// <inheritdoc />
    public async Task<Result> CreateAsync(AuctionDal model)
    {
        var auction = new AuctionDal(model.Name!, model.AuthorId, model.DateStart, model.DateEnd);

        await _context.Auctions.AddAsync(auction);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> DeleteAsync(Guid id)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == id);

        if (auction is null)
            return Result.Ok();
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя удалить");
        
        _context.Auctions.Remove(auction);
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> UpdateAsync(AuctionDal model)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == model.Id);

        if (auction is null)
            return Result.Fail("Аукцион не найден");
        
        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя редактировать");

        auction.Name = model.Name;
        auction.IsCanceled = model.IsCanceled;
        auction.IsCreation = model.IsCreation;
        auction.DateStart = model.DateStart;
        auction.DateEnd = model.DateEnd;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> ChangeCreationStateAsync(Guid id)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == id);

        if (auction is null)
            return Result.Fail("Аукцион найден");
        
        if (!auction.IsEditable)
            return Result.Fail("У данного аукциона нельзя изменить состояние");

        auction.IsCreation = !auction.IsCreation;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    /// <inheritdoc />
    public async Task<Result> CancelAsync(Guid id)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc!.Id == id);

        if (auction is null)
            throw new Exception("Аукцион не найден");

        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя отменить");

        auction.IsCanceled = true;
        await _context.SaveChangesAsync();
        return Result.Ok();
    }
}