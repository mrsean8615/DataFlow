using Microsoft.AspNetCore.Mvc;
using DataFlow.Api.Entities;
using DataFlow.Api.Logic;
using DataFlow.Api.Interfaces;


namespace DataFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TestAPI : ControllerBase
{
    private readonly ILogger<TestAPI> _logger;
    private readonly ITestLogic _testLogic;

    public TestAPI(ILogger<TestAPI> logger, ITestLogic testLogic)
    {
        _logger = logger;
        _testLogic = testLogic;
    }

    [HttpGet]
    public ActionResult<Test> Get()
    {
        var result = _testLogic.GetTest();
        return Ok(result);
    }
}