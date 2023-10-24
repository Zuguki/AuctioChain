using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.GetAll;

/// <summary>
/// Обработчик запроса на получение аукционов
/// </summary>
public class GetAuctionsQueryHandler : IRequestHandler<GetAuctionsQuery, Result<IEnumerable<Auction>>>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// .ctor
    /// </summary>
    public GetAuctionsQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public Task<Result<IEnumerable<Auction>>> Handle(GetAuctionsQuery request, CancellationToken cancellationToken)
    {
        var result = (IEnumerable<Auction>) _context.Auctions.ToList();
        return Task.FromResult(Result.Ok(result));
    }
}