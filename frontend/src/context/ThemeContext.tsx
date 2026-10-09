import React, { createContext, useContext, useEffect, useState } from "react";
import { COLORS } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeColors = typeof COLORS.light | typeof COLORS.dark;

type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "theme";

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === "dark") {
          setIsDark(true);
        } else if (savedTheme === "light") {
          setIsDark(false);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const colors = isDark ? COLORS.dark : COLORS.light;

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeContextProvider");
  }

  return context;
}
