using System.Collections.Generic;
using AuctioChain.DAL.Models;
using FluentResults;
using MediatR;

namespace AuctioChain.BL.Auctions.GetAll;

/// <summary>
/// Запрос на получение всех аукционов
/// </summary>
public class GetAuctionsQuery : IRequest<Result<IEnumerable<Auction>>>
{
}