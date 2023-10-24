using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions.Delete;

/// <summary>
/// Обработчик команды удаления аукциона
/// </summary>
public class DeleteAuctionCommandHandler : IRequestHandler<DeleteAuctionCommand, Result>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public DeleteAuctionCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<Result> Handle(DeleteAuctionCommand request, CancellationToken cancellationToken)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request.AuctionId, cancellationToken);

        if (auction is null)
            return Result.Ok();

        if (!auction.IsEditable)
            return Result.Fail("Данный аукцион нельзя удалить");

        _context.Auctions.Remove(auction);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}