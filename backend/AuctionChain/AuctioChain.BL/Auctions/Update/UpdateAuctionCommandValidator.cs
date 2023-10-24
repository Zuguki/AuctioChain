using AuctioChain.BL.Mediator;
using FluentResults;

namespace AuctioChain.BL.Auctions.Update;

/// <summary>
/// Валидация команды обновления аукциона
/// </summary>
public class UpdateAuctionCommandValidator : IValidator<UpdateAuctionCommand>
{
    /// <inheritdoc />
    public Result Validate(UpdateAuctionCommand? request)
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