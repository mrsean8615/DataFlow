using DataFlow.Api.Entities;

namespace DataFlow.Api.Interfaces;



public interface IAuthLogic
{
    Task<LoginOutput> Login(LoginInput input);
}

public interface IAuthRepository
{
    Task<LoginOutput> Login(LoginInput input);

}