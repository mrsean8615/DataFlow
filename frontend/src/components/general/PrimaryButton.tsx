import { Text, Pressable, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";

function PrimaryButton({ title }: { title: string }) {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? [styles.button, styles.buttonPressed] : styles.button,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dark.background,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.dark.text,
    fontSize: FONT_SIZES.small,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PrimaryButton;
