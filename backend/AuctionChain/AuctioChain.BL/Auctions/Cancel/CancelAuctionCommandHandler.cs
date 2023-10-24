using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions.Cancel;

/// <summary>
/// Обработчик комманды отмены аукциона
/// </summary>
public class CancelAuctionCommandHandler : IRequestHandler<CancelAuctionCommand, Result>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public CancelAuctionCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<Result> Handle(CancelAuctionCommand request, CancellationToken cancellationToken)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request.AuctionId, cancellationToken);
        if (auction is null)
            return Result.Fail("Аукцион не найден");

        if (!auction.IsEditable)
            return Result.Fail("У данного аукциона нельзя изменить состояние");
        
        auction.Cancel();
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}