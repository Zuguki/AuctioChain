using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions.Update;

/// <summary>
/// Обработчик команды обновления аукциона
/// </summary>
public class UpdateAuctionCommandHandler : IRequestHandler<UpdateAuctionCommand, Result>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public UpdateAuctionCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<Result> Handle(UpdateAuctionCommand request, CancellationToken cancellationToken)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request.AuctionId, cancellationToken);

        if (auction is null)
            return Result.Fail("Аукцион не найден");

        if (!auction.IsEditable)
            return Result.Fail("Данный ауцион нельзя менять");
        
        auction.UpdateName(request.Name!);
        auction.UpdateDateStart(request.DateStart);
        auction.UpdateDateEnd(request.DateEnd);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Result.Ok();
    }
}