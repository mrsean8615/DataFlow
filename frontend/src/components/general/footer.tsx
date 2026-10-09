import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_SIZES, SPACING, COLORS } from "../../constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";

import { Settings, Home, User, ShelvingUnit } from "lucide-react-native";

export default function Footer() {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.headerFooterBackground,
        },
      ]}
    >
      <Pressable>
        <Link href="/pages/settings/settings-page">
          <Settings size={36} color={COLORS.dark.text} />
        </Link>
      </Pressable>
      <Pressable>
        <Link href="/pages/home-page">
          <Home size={36} color={COLORS.dark.text} />
        </Link>
      </Pressable>
      <Pressable>
        <Link href="/pages/inventory/inventory-page">
          <ShelvingUnit size={36} color={COLORS.dark.text} />
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  text: {
    fontSize: FONT_SIZES.small,
    textAlign: "center",
  },
});
