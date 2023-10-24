using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctioChain.BL.Auctions.GetById;

/// <summary>
/// Обработчик команы для получения аукциона
/// </summary>
public class GetAuctionByIdCommandHandler : IRequestHandler<GetAuctionByIdCommand, Result<Auction>>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public GetAuctionByIdCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<Result<Auction>> Handle(GetAuctionByIdCommand request, CancellationToken cancellationToken)
    {
        var result = await _context.Auctions.FirstOrDefaultAsync(auc => auc.Id == request.AuctionId, cancellationToken: cancellationToken);
        if (result is null)
            return Result.Fail("Аукцион не найден");

        return result;
    }
}