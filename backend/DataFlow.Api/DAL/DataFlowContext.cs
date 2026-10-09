using DataFlow.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataFlow.Api.DAL;

public class DataFlowContext : DbContext
{
    public DataFlowContext(DbContextOptions<DataFlowContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure the GetInventoryOutput entity
        modelBuilder.Entity<GetInventoryOutput>(entity =>
        {
            entity.HasNoKey(); // This entity does not have a primary key
            entity.ToView(null); // This entity is not mapped to a database view
        });
        modelBuilder.Entity<BaseOutputEntity>(entity =>
        {
            entity.HasNoKey(); // This entity does not have a primary key
            entity.ToView(null); // This entity is not mapped to a database view
        });
    }

}