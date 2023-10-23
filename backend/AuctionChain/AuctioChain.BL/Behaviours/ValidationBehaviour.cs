using System.Threading;
using System.Threading.Tasks;
using AuctioChain.BL.Mediator;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Behaviours;

/// <summary>
/// Пайплайн валидации входящих комманд
/// </summary>
public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> 
    where TRequest : IRequest<TResponse> 
    where TResponse : ResultBase, new()
{
    private readonly IValidator<TRequest> _validator;

    /// <summary>
    /// .ctor
    /// </summary>
    /// <param name="validator">Валидатор кокретной комманды / запроса</param>
    public ValidationBehaviour(IValidator<TRequest> validator)
    {
        _validator = validator;
    }

    /// <inheritdoc />
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var validationResult = _validator.Validate(request);

        if (validationResult.IsFailed)
        {
            var response = new TResponse();
            response.Reasons.AddRange(validationResult.Reasons);
            return response;
        }

        return await next();
    }
}