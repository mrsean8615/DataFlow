using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.Helpers;

namespace DataFlow.Api.Logic;

public class InventoryLogic : IInventoryLogic
{
    private readonly IInventoryRepository _inventoryRepository;
    private readonly Logger _logger;

    public InventoryLogic(IInventoryRepository inventoryRepository, Logger logger)
    {
        _inventoryRepository = inventoryRepository;
        _logger = logger;
    }

    public async Task<List<GetInventoryOutput>> GetInventory()
    {   
        try {

            return await _inventoryRepository.GetInventory();
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventoryLogic),
                methodName = nameof(GetInventory),
                eventData = ex
            });
            throw;
        }
    }

        public async Task<BaseOutputEntity> AddInventoryItem(AddInventoryItemInput input)
    {   
        try {

            return await _inventoryRepository.AddInventoryItem(input);
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(InventoryLogic),
                methodName = nameof(AddInventoryItem),
                eventData = ex
            });
            throw;
        }
    }
}