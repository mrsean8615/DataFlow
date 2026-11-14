using DataFlow.Api.Entities;

namespace DataFlow.Api.Interfaces;



public interface IAuthLogic
{
    Task<LoginOutput> Login(LoginInput input);
    Task<GetUsersOutput> GetUsers(GetUsersInput input);
    Task<BaseOutputEntity> CreateUser(CreateUserInput input);

}

public interface IAuthRepository
{
    Task<LoginOutput> Login(LoginInput input);
    Task<GetUsersOutput> GetUsers(GetUsersInput input);
    Task<BaseOutputEntity> CreateUser(CreateUserInput input);

}