export type InventoryItem = {
  intventoryID: number;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  reorderLevel: number;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryItemInput = {
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  reorderLevel: number;
  location?: string;
};
