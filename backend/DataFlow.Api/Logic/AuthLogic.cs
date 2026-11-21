using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.Helpers;

namespace DataFlow.Api.Logic;

public class AuthLogic : IAuthLogic
{
    private readonly IAuthRepository _authRepository;
    private readonly Logger _logger;
    private readonly JwtService _jwtService;

    public AuthLogic(IAuthRepository authRepository, Logger logger, JwtService jwtService)
    {
        _authRepository = authRepository;
        _logger = logger;
        _jwtService = jwtService;
    }

public async Task<LoginOutput> Login(LoginInput input)
{
    try
    {
        var user = await _authRepository.GetUserByEmail(input.email);

        if (user == null || user.returnCode != 0)
        {
            return new LoginOutput
            {
                returnCode = 1,
                returnMessage = "Invalid email or password."
            };
        }

        bool isValid = PasswordUtils.VerifyPassword(
            user.passwordHash,
            input.password
        );

        if (!isValid)
        {
            return new LoginOutput
            {
                returnCode = 1,
                returnMessage = "Invalid email or password."
            };
        }

        var output = new LoginOutput
        {
            returnCode = 0,
            returnMessage = "Login successful.",
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role
        };

        output.token = _jwtService.GenerateToken(output);

        return output;
    }
    catch (Exception ex)
    {
        await _logger.LogEventAsync(new EventLog
        {
            eventType = "ERROR",
            className = nameof(AuthLogic),
            methodName = nameof(Login),
            eventData = ex
        });

        throw;
    }
}

    public async Task<GetUsersOutput> GetUsers(GetUsersInput input)
    {
        try
        {
            var users = await _authRepository.GetUsers(input);
            if (users == null) 
            {
                return new GetUsersOutput();
            }

            return users;
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthLogic),
                methodName = nameof(GetUsers),
                eventData = ex
            });

            throw;
        }
    } 
        public async Task<BaseOutputEntity> CreateUser(CreateUserInput input)
    {
        try
        {
            input.password = PasswordUtils.HashPassword(input.password);
            var users = await _authRepository.CreateUser(input);
            if (users == null) 
            {
                return new BaseOutputEntity();
            }

            return users;
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthLogic),
                methodName = nameof(CreateUser),
                eventData = ex
            });

            throw;
        }
    } 


}

