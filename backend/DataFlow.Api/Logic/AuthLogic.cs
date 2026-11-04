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
            var user = await _authRepository.Login(input);

            if (user == null) 
            {
                return new LoginOutput();
            }

            user.token = _jwtService.GenerateToken(user);

            return user;

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


}