using DataFlow.Api.Entities;

namespace DataFlow.Api.Interfaces;


public interface ITestLogic
{
    Task<Test> GetTest();
}

public interface ITestRepository
{
    Task<Test> GetTest();
}