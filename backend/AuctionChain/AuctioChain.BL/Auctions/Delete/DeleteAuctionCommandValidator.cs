using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.Delete;

/// <summary>
/// Валидация команды удаления аукциона
/// </summary>
public class DeleteAuctionCommandValidator : IValidator<DeleteAuctionCommand>
{
    /// <inheritdoc />
    public Result Validate(DeleteAuctionCommand? request)
    {
        if (request is null)
            return Result.Fail("Не удалось распознать данные");

        if (request.AuctionId == default)
            return Result.Fail("Переданн некорректный id аукциона");

        return Result.Ok();
    }
}