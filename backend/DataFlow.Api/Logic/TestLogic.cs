using DataFlow.Api.Entities;
using DataFlow.Api.Repositories;
using DataFlow.Api.Interfaces;
using DataFlow.Api.Helpers;

namespace DataFlow.Api.Logic;

public class TestLogic : ITestLogic
{
    private readonly ITestRepository _testRepository;
    private readonly Logger _logger;

    public TestLogic(ITestRepository testRepository, Logger logger)
    {
        _testRepository = testRepository;
        _logger = logger;
    }

    public async Task<Test> GetTest()
    {   
        return await _testRepository.GetTest();
    }
}