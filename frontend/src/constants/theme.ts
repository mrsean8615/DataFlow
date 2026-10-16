/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const COLORS = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    headerFooterBackground: "#0b1730",
  },
  dark: {
    text: "#ffffff",
    background: "#121212",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    headerFooterBackground: "#0b1730",
  },
  buttons: {
    primary: "#2f8cff",
    secondary: "#60646C",
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

export const HEADER = {
  iconSize: 26,
  buttonSize: 44,
  horizontalPadding: SPACING.md,
  bottomPadding: SPACING.sm,
  titleLetterSpacing: 0.4,
  titleColor: "#ffffff",
};

export const FONT_SIZES = {
  small: 14,
  body: 16,
  title: 24,
  subtitle: 20,
};

export type ThemeColor = keyof typeof COLORS.light & keyof typeof COLORS.dark;

export const FONTS = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  android: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif-rounded",
    mono: "monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "Arial",
    serif: "Georgia",
    rounded: "Trebuchet MS",
    mono: "monospace",
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
