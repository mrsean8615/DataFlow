using Microsoft.EntityFrameworkCore;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.DAL;
using DataFlow.Api.Helpers;
using System.Data;
using Microsoft.Data.SqlClient;

namespace DataFlow.Api.Repositories;

public class InventorySQL : IInventoryRepository
{
    private readonly DataFlowContext _context;
    private readonly Logger _logger;

    public InventorySQL(DataFlowContext context, Logger logger)
    {
        _context = context;
        _logger = logger;
    }

    private static IDbDataParameter CreateParameter(
        System.Data.Common.DbCommand command,
        string name,
    object? value)
    {
        var parameter = command.CreateParameter();
        parameter.ParameterName = name;
        parameter.Value = value ?? DBNull.Value;
        return parameter;
    }

    public async Task<List<GetInventoryOutput>> GetInventory()
    {

        List<GetInventoryOutput> result = new List<GetInventoryOutput>();
        try {
            result = await _context.Set<GetInventoryOutput>()
                .FromSqlRaw("EXEC GetInventory")
                .ToListAsync();

            return result;
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventorySQL),
                methodName = nameof(GetInventory),
                eventData = ex,
            });
            throw;
        }
    }


    public async Task<BaseOutputEntity> AddInventoryItem(AddInventoryItemInput input)
    {
        try
        {
            var result = await _context.Set<BaseOutputEntity>()
                .FromSqlRaw(
                    """
                    EXEC dbo.AddInventoryItem
                        @SKU = {0},
                        @Name = {1},
                        @Description = {2},
                        @Quantity = {3},
                        @ReorderLevel = {4},
                        @Location = {5}
                    """,
                    input.sku,
                    input.name,
                    input.description,
                    input.quantity,
                    input.reorderLevel,
                    input.location)
                .ToListAsync();
            return result.First();
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventorySQL),
                methodName = nameof(AddInventoryItem),
                eventData = ex
            });

            throw;
        }
    }

    
}