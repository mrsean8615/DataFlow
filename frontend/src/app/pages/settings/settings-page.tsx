import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import { FONT_SIZES, SPACING } from "@/constants/theme";

import ScreenTitle from "@/components/general/ScreenTitle";

export default function SettingsPage() {
  const { colors, toggleTheme, isDark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.text} />
      </Pressable>
      <ScreenTitle>Settings</ScreenTitle>
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Preferences
        </Text>
        <View style={styles.item}>
          <Text style={{ color: colors.text }}>
            {isDark ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            value={colors.background === "#121212"}
            onValueChange={() => {
              toggleTheme();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    marginTop: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZES.subtitle,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
