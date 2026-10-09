import { InventoryItemInput } from "@/types/inventoryType";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function GetInventory() {
  const response = await fetch(`${API_URL}/api/Inventory/GetInventory`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

export async function AddInventoryItem(item: InventoryItemInput) {
  const response = await fetch(`${API_URL}/api/Inventory/AddInventoryItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}
