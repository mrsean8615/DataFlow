import { InventoryItem } from "./inventoryType";
import type { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Inventory: undefined;
  AddItem: undefined;
  Profile: undefined;
  InventoryDetails: { item: InventoryItem };
  Orders: undefined;
  Shipments: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  InventoryTab: undefined;
  ShipmentsTab: undefined;
  OrdersTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
};
