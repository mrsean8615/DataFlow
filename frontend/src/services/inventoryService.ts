import { InventoryItemInput } from "@/types/inventoryType";
import { getToken } from "@/services/tokenStorage";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function GetInventory() {
  const token = await getToken();
  const response = await fetch(`${API_URL}/api/Inventory/GetInventory`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

export async function AddInventoryItem(item: InventoryItemInput) {
  const token = await getToken();
  const response = await fetch(`${API_URL}/api/Inventory/AddInventoryItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}
