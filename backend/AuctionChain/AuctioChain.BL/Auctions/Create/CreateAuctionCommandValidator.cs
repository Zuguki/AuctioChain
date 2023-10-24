using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.Create;

/// <summary>
/// Валидатор комманды создания аукциона
/// </summary>
public class CreateAuctionCommandValidator : IValidator<CreateAuctionCommand>
{
    /// <inheritdoc />
    public Result Validate(CreateAuctionCommand? request)
    {
        if (request is null)
            return Result.Fail("Не удалось распознать данные");

        if (string.IsNullOrWhiteSpace(request.Name))
            return Result.Fail("Переданно пустое имя");

        if (request.DateStart >= request.DateEnd)
            return Result.Fail("Дата завершения не может быть меньше или равна дате начала аукциона");
        
        if (request.DateStart == default)
            return Result.Fail("Переданна некорректная дата начала аукциона");
        
        if (request.DateEnd == default)
            return Result.Fail("Переданна некорректная дата завершения аукциона");
        
        return Result.Ok();
    }
}