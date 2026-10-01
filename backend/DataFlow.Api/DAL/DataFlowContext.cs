using DataFlow.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataFlow.Api.DAL;

public class DataFlowContext : DbContext
{
    public DataFlowContext(DbContextOptions<DataFlowContext> options)
        : base(options)
    {
    }

    public DbSet<Test> Tests { get; set; }
}