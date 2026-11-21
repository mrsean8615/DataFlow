import { InventoryItemInput } from "@/types/inventoryType";
import { getToken } from "@/services/tokenStorage";
import { useDemoData } from "@/app/utils/dataUtils";
import { demoInventory } from "@/data/demoInventory";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function GetInventory() {
  const demoData = useDemoData(demoInventory);
  if (demoData) {
    return demoData;
  }
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
