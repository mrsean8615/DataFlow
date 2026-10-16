import { NavigationContainer } from "@react-navigation/native";

import { ThemeContextProvider } from "@/context/ThemeContext";
import AppNavigator from "@/app/navigation/AppNavigator";

export default function Layout() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
