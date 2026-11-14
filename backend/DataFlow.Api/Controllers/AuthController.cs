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

    [Authorize]
    [HttpPost("GetUsers")]
    public async Task<ActionResult<GetUsersOutput>> GetUsers([FromBody] GetUsersInput input)

    {
        var result = new GetUsersOutput();
        try
        {
            result = await _authLogic.GetUsers(input);

            if (result == null)
            {
                return Unauthorized("Unable to fetch users.");
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthController),
                methodName = nameof(GetUsers),
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

    [Authorize]
    [HttpPost("CreateUser")]
    public async Task<ActionResult<BaseOutputEntity>> CreateUser([FromBody] CreateUserInput input)

    {
        var result = new BaseOutputEntity();
        try
        {
            result = await _authLogic.CreateUser(input);

            if (result == null)
            {
                return Unauthorized("Unable to create user.");
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthController),
                methodName = nameof(CreateUser),
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