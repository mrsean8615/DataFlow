import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@/types/navigationTypes";
import MainLayout from "./MainLayout";

import HomePage from "../pages/home-page";
import SettingsPage from "../pages/settings/settings-page";
import InventoryPage from "../pages/inventory/inventory-page";
import AddItemPage from "../pages/add-item/add-item-page";
import ProfilePage from "../pages/profile/profile-page";
import InventoryDetailsPage from "../pages/inventory/inventory-details-page";
import ShipmentsPage from "../pages/shipments/shipments-page";
import OrdersPage from "../pages/orders/orders-page";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home">
        {() => (
          <MainLayout title="Home">
            <HomePage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Settings">
        {() => (
          <MainLayout title="Settings">
            <SettingsPage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Inventory">
        {() => (
          <MainLayout title="Inventory">
            <InventoryPage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="InventoryDetails">
        {() => (
          <MainLayout title="Inventory Details">
            <InventoryDetailsPage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="AddItem">
        {() => (
          <MainLayout title="Add Inventory Item">
            <AddItemPage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {() => (
          <MainLayout title="Profile">
            <ProfilePage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Orders">
        {() => (
          <MainLayout title="Orders">
            <OrdersPage />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Shipments">
        {() => (
          <MainLayout title="Shipments">
            <ShipmentsPage />
          </MainLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
