import { Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";

function ScreenTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.dark.text,
    fontSize: FONT_SIZES.title,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
});

export default ScreenTitle;
