import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAuth } from "@/context/AuthContext";

import {
  Home,
  ShelvingUnit,
  User,
  Truck,
  ArrowLeftRight,
  Settings,
  LogIn,
  LogOut,
  ShieldLock,
} from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import MainLayout from "./MainLayout";

import HomePage from "../pages/home-page";
import InventoryPage from "../pages/inventory/inventory-page";
import InventoryDetailsPage from "../pages/inventory/inventory-details-page";
import AddItemPage from "../pages/add-item/add-item-page";
import ProfilePage from "../pages/profile/profile-page";
import ShipmentsPage from "../pages/shipments/shipments-page";
import OrdersPage from "../pages/orders/orders-page";
import SettingsPage from "../pages/settings/settings-page";
import LoginPage from "../pages/account/login-page";
import { ActivityIndicator } from "react-native";
import AdminPage from "../pages/admin/admin-page";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Screen components

function HomeScreen() {
  return (
    <MainLayout title="DataFlow">
      <HomePage />
    </MainLayout>
  );
}

function AdminScreen() {
  return (
    <MainLayout title="Admin Panel">
      <AdminPage />
    </MainLayout>
  );
}

function InventoryScreen() {
  return (
    <MainLayout title="Inventory">
      <InventoryPage />
    </MainLayout>
  );
}

function InventoryDetailsScreen() {
  return (
    <MainLayout title="Inventory Details">
      <InventoryDetailsPage />
    </MainLayout>
  );
}

function AddItemScreen() {
  return (
    <MainLayout title="Add Inventory Item">
      <AddItemPage />
    </MainLayout>
  );
}

function ShipmentsScreen() {
  return (
    <MainLayout title="Shipments">
      <ShipmentsPage />
    </MainLayout>
  );
}

function OrdersScreen() {
  return (
    <MainLayout title="Orders">
      <OrdersPage />
    </MainLayout>
  );
}

function ProfileScreen() {
  return (
    <MainLayout title="Profile">
      <ProfilePage />
    </MainLayout>
  );
}

function SettingsScreen() {
  return (
    <MainLayout title="Settings">
      <SettingsPage />
    </MainLayout>
  );
}

function LoginScreen() {
  return <LoginPage />;
}

// Nested stack navigators
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DataFlow" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function InventoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Inventory"
    >
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen
        name="InventoryDetails"
        component={InventoryDetailsScreen}
      />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
    </Stack.Navigator>
  );
}

function ShipmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Shipments" component={ShipmentsScreen} />
    </Stack.Navigator>
  );
}

function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Admin Panel" component={AdminScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.headerFooterBackground }}
    >
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => <User color={color} size={size} />}
        onPress={() => props.navigation.navigate("Profile")}
        labelStyle={{ color: "#FFFFFF" }}
        activeTintColor="#FFFFFF"
        inactiveTintColor="#AAB3C2"
      />
      {isAuthenticated && user?.role.toLowerCase() === "admin" && (
        <DrawerItem
          label="Admin Panel"
          icon={({ color, size }) => <ShieldLock color={color} size={size} />}
          onPress={() => props.navigation.navigate("Admin")}
          labelStyle={{ color: "#FFFFFF" }}
          activeTintColor="#FFFFFF"
          inactiveTintColor="#AAB3C2"
        />
      )}
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => <Settings color={color} size={size} />}
        onPress={() => props.navigation.navigate("Settings")}
        labelStyle={{ color: "#FFFFFF" }}
        activeTintColor="#FFFFFF"
        inactiveTintColor="#AAB3C2"
      />
      {isAuthenticated && (
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <LogOut color={color} size={size} />}
          onPress={() => logout()}
          labelStyle={{ color: "#FFFFFF" }}
          activeTintColor="#FFFFFF"
          inactiveTintColor="#AAB3C2"
        />
      )}
    </DrawerContentScrollView>
  );
}

// Main tab navigator

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#AAB3C2",
        tabBarStyle: {
          backgroundColor: colors.headerFooterBackground,
          borderTopWidth: 0,
          height: 76,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="InventoryTab"
        component={InventoryStack}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <ShelvingUnit color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ShipmentsTab"
        component={ShipmentsStack}
        options={{
          title: "Shipments",
          tabBarIcon: ({ color, size }) => <Truck color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <ArrowLeftRight color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      id="RootDrawer"
      initialRouteName="MainTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: "#0b1730",
          width: 260,
        },
        overlayColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Admin" component={AdminStack} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <RootStack.Screen name="Login" component={LoginScreen} />
      ) : (
        <RootStack.Screen name="MainDrawer" component={MainDrawer} />
      )}
    </RootStack.Navigator>
  );
}
