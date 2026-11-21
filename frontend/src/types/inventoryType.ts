export type InventoryItem = {
  inventoryID: number;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  reorderLevel: number;
  location?: string;
  category?: string;
  imageURL?: string;
  barcode?: string;
  unitOfMeasure?: string;
  isActive?: boolean;
  lastRestockedAt?: Date;
  supplierID?: number;
  createdAt: Date;
  updatedAt?: Date;
};

export type InventoryItemInput = {
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  reorderLevel: number;
  location?: string;
};
