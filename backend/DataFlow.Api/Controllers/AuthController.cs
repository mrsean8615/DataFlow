using Microsoft.AspNetCore.Mvc;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace DataFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly Logger _logger;
    private readonly IAuthLogic _authLogic;

    public AuthController(Logger logger, IAuthLogic authLogic)
    {
        _logger = logger;
        _authLogic = authLogic;
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<LoginOutput>> Login(
        [FromBody] LoginInput input)
    {
        await _logger.LogEventAsync(new EventLog
            {
                eventType = "INFO",
                className = nameof(AuthController),
                methodName = nameof(Login),
                eventData = new Exception($"Login attempt for email: {input.email}")
            });
        try
        {

            var result = await _authLogic.Login(input);

            if (result == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthController),
                methodName = nameof(Login),
                eventData = ex
            });

            // return StatusCode(500, "An error occurred while logging in.");
            return StatusCode(500, new
            {
                message = ex.Message,
                details = ex.InnerException?.Message
            });
        }
    }
}