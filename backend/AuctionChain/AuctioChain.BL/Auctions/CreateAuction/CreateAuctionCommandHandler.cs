using System;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.CreateAuction;

/// <summary>
/// Обработчик комманды создания аукциона
/// </summary>
public class CreateAuctionCommandHandler : IRequestHandler<CreateAuctionCommand, Result>
{
    private readonly ApplicationDbContext _context;

    public CreateAuctionCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<Result> Handle(CreateAuctionCommand request, CancellationToken cancellationToken)
    {
        var auction = new Auction(request.Name!, Guid.NewGuid(), request.DateStart, request.DateEnd);

        await _context.Auctions.AddAsync(auction, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}