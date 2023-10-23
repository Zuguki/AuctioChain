using System;
using System.Threading;
using System.Threading.Tasks;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.CreateAuction;

/// <summary>
/// Обработчик комманды создания аукциона
/// </summary>
public class CreateAuctionCommandHandler : IRequestHandler<CreateAuctionCommand, Result>
{
    /// <inheritdoc />
    public Task<Result> Handle(CreateAuctionCommand request, CancellationToken cancellationToken)
    {
        return Task.FromResult(Result.Ok());
    }
}