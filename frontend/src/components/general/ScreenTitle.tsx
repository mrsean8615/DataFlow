import { Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

function ScreenTitle({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return <Text style={[{ color: colors.text }, styles.title]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.title,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
});

export default ScreenTitle;
