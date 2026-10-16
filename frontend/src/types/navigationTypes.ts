import { InventoryItem } from "./inventoryType";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Inventory: undefined;
  AddItem: undefined;
  Profile: undefined;
  InventoryDetails: { item: InventoryItem };
  Orders: undefined;
  Shipments: undefined;
};
