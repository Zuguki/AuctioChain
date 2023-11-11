using System.Linq;
using System.Threading.Tasks;
using AuctioChain.BL.Accounts;
using AuctioChain.DAL.Models.Account.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AuctioChain.Controllers.Account;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private readonly IAccountManager _accountManager;

    public AccountsController(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");

        var response = await _accountManager.Authenticate(request);
        if (response.IsFailed)
            return BadRequest(string.Join(", ", response.Reasons.Select(r => r.Message)));

        return Ok(response.Value);
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Переданны некорректные данные");
        
        var result = await _accountManager.CreateAsync(request);
        if (result.IsFailed)
            return BadRequest(string.Join(", ", result.Reasons.Select(r => r.Message)));

        return Ok();
    }
}
