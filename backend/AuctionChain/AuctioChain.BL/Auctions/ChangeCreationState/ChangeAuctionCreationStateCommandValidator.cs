using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.ChangeCreationState;

/// <summary>
/// Валидация комнады изменения состояния готовности аукциона
/// </summary>
public class ChangeAuctionCreationStateCommandValidator : IValidator<ChangeAuctionCreationStateCommand>
{
    /// <summary>
    /// Валидация
    /// </summary>
    /// <returns></returns>
    public Result Validate(ChangeAuctionCreationStateCommand? request)
    {
        if (request is null)
            return Result.Fail("Не удалось распознать данные");

        if (request.AuctionId == default)
            return Result.Fail("Переданн некорректный id аукциона");

        return Result.Ok();
    }
}