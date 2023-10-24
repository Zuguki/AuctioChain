using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions.ChangeCreationState;

/// <summary>
/// Команда для изменения состояния аукциона
/// </summary>
public class ChangeAuctionCreationStateCommandHandler : IRequestHandler<ChangeAuctionCreationStateCommand, Result>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .cror
    /// </summary>
    public ChangeAuctionCreationStateCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }
    
    /// <inheritdoc />
    public async Task<Result> Handle(ChangeAuctionCreationStateCommand request, CancellationToken cancellationToken)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request.AuctionId, cancellationToken);
        if (auction is null)
            return Result.Fail("Аукцион не найден");

        if (!auction.IsEditable)
            return Result.Fail("У данного аукциона нельзя изменить состояние");
        
        auction.ChangeCreationState();
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}