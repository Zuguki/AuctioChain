using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.Cancel;

/// <summary>
/// Валидатор комманды создания аукциона
/// </summary>
public class CancelAuctionCommandValidator : IValidator<CancelAuctionCommand>
{
    /// <inheritdoc />
    public Result Validate(CancelAuctionCommand? request)
    {
        if (request is null)
            return Result.Fail("Не удалось распознать данные");

        if (request.AuctionId == default)
            return Result.Fail("Переданн некорректный id аукциона");

        return Result.Ok();
    }
}