using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.GetById;

/// <summary>
/// Валидатор команды получения аукциона
/// </summary>
public class GetAuctionByIdCommandValidator : IValidator<GetAuctionByIdCommand>
{
    /// <inheritdoc />
    public Result Validate(GetAuctionByIdCommand? request)
    {
        if (request is null)
            return Result.Fail("Не удалось распознать данные");

        if (request.AuctionId == default)
            return Result.Fail("Переданн некорректный id аукциона");

        return Result.Ok();
    }
}