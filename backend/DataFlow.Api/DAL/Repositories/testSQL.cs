using Microsoft.EntityFrameworkCore;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.DAL;

namespace DataFlow.Api.Repositories;

public class TestSQL : ITestRepository
{
    private readonly DataFlowContext _context;

    public TestSQL(DataFlowContext context)
    {
        _context = context;
    }

    public Test GetTest()
    {
        return new Test { message = "heyo" };
    }
}