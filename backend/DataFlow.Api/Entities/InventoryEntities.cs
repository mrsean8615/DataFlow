namespace DataFlow.Api.Entities
{
public class GetInventoryOutput
{
    public int inventoryID { get; set; }

    public required string sku { get; set; }
    public required string name { get; set; }

    public string? description { get; set; }

    public int quantity { get; set; }
    public int reorderLevel { get; set; }

    public string? location { get; set; }
    public string? category { get; set; }
    public string? imageURL { get; set; }
    public string? barcode { get; set; }

    public string? unitOfMeasure { get; set; } = "Each";

    public bool? isActive { get; set; }

    public DateTime? lastRestockedAt { get; set; }

    public int? supplierID { get; set; }

    public DateTime createdAt { get; set; }
    public DateTime? updatedAt { get; set; }
}

    public class AddInventoryItemInput 
    {
        public required string sku { get; set; } 
        public required string name { get; set; } 
        public string? description { get; set; }
        public int quantity { get; set; }
        public int reorderLevel { get; set; }
        public string? location { get; set; }
    }
}