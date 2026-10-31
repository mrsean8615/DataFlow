import { NavigationContainer } from "@react-navigation/native";

import { ThemeContextProvider } from "@/context/ThemeContext";
import AppNavigator from "@/app/navigation/AppNavigator";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Layout() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
