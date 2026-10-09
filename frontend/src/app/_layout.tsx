import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { ThemeContextProvider } from "@/context/ThemeContext";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";

export default function Layout() {
  return (
    <ThemeContextProvider>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="pages/home-page" options={{ title: "Home" }} />
            <Stack.Screen
              name="pages/settings/settings-page"
              options={{ title: "Settings" }}
            />
            <Stack.Screen
              name="pages/add-item/add-item-page"
              options={{ title: "Add Item" }}
            />
            <Stack.Screen
              name="pages/inventory/inventory-page"
              options={{ title: "Inventory" }}
            />
          </Stack>
        </View>
        <Footer />
      </View>
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
