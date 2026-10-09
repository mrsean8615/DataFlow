using Microsoft.AspNetCore.Mvc;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.Helpers;


namespace DataFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class InventoryController : ControllerBase
{
    private readonly Logger _logger;
    private readonly IInventoryLogic _inventoryLogic;

    public InventoryController(Logger logger, IInventoryLogic inventoryLogic)
    {
        _logger = logger;
        _inventoryLogic = inventoryLogic;
    }

    [HttpGet("GetInventory")]
    public async Task<ActionResult<List<GetInventoryOutput>>> GetInventory()
    {
        try
        {
            var result = await _inventoryLogic.GetInventory();
            return Ok(result);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventoryController),
                methodName = nameof(GetInventory),
                eventData = ex
            });
            return StatusCode(500, "An error occurred while retrieving inventory data.");
        }
    }

    [HttpPost("AddInventoryItem")]
    public async Task<ActionResult<List<BaseOutputEntity>>> AddInventoryItem([FromBody] AddInventoryItemInput input)
    {
        try
        {
            var result = await _inventoryLogic.AddInventoryItem(input);
            return Ok(result);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventoryController),
                methodName = nameof(AddInventoryItem),
                eventData = ex
            });
            return StatusCode(500, "An error occurred while retrieving inventory data.");
        }
    }
}