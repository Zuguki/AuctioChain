using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers;

/// <summary>
/// контроллер для работы с пользователем
/// </summary>
[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    /// <summary>
    /// Ауфентицация пользователя
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AuthAsync()
    {
        return Ok();
    }
}
