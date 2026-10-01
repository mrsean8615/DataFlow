using DataFlow.Api.Entities;

namespace DataFlow.Api.Interfaces;


public interface ITestLogic
{
    Test GetTest();
}

public interface ITestRepository
{
    Test GetTest();
}