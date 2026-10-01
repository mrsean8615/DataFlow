using DataFlow.Api.Entities;
using DataFlow.Api.Repositories;
using DataFlow.Api.Interfaces;

namespace DataFlow.Api.Logic;

public class TestLogic : ITestLogic
{
    private readonly ITestRepository _testRepository;

    public TestLogic(ITestRepository testRepository)
    {
        _testRepository = testRepository;
    }

    public Test GetTest()
    {
        return _testRepository.GetTest();
    }
}