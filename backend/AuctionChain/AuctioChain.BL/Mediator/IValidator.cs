using AuctioChain.BL.Behaviours;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Mediator;

/// <summary>
/// Интерфейс для объявления валидатора для использования в <see cref="ValidationBehaviour"/>
/// </summary>
/// <typeparam name="T">Команда / запрос</typeparam>
public interface IValidator<in T> where T : IBaseRequest
{
    /// <summary>
    /// Валидация команды / запроса
    /// </summary>
    /// <param name="request">Команда / запрос</param>
    /// <returns></returns>
    Result Validate(T request);
}