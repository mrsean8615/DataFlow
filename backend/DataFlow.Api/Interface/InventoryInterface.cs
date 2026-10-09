using DataFlow.Api.Entities;

namespace DataFlow.Api.Interfaces;



public interface IInventoryLogic
{
    Task<List<GetInventoryOutput>> GetInventory();
    Task<BaseOutputEntity> AddInventoryItem(AddInventoryItemInput input);
}

public interface IInventoryRepository
{
    Task<List<GetInventoryOutput>> GetInventory();
    Task<BaseOutputEntity> AddInventoryItem(AddInventoryItemInput input);
}