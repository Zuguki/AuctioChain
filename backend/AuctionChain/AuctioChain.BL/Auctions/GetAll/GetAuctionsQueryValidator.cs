using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.GetAll;

/// <summary>
/// Валидация запроса на получение аукционов
/// </summary>
public class GetAuctionsQueryValidator : IValidator<GetAuctionsQuery>
{
    /// <inheritdoc />
    public Result Validate(GetAuctionsQuery request)
    {
        return Result.Ok();
    }
}