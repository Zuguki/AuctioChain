using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers;

/// <summary>
/// Контроллер для ставок
/// </summary>
[ApiController]
[Route("api/v1/auction/lots/bets")]
public class BetsController : ControllerBase
{
    /// <summary>
    /// Сделать ставку
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> DoBetAsync()
    {
        return Ok();
    }
}