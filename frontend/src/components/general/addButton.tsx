import { Text, Pressable, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Plus } from "lucide-react-native";

function AddButton({ style, onPress }: { style?: any; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? [styles.button, styles.buttonPressed] : styles.button,
        style,
      ]}
      onPress={onPress}
    >
      <Plus size={24} color={COLORS.dark.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.buttons.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",

    // Shadow for iOS
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",

    // Shadow for Android
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: COLORS.buttons.secondary,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.dark.text,
    fontSize: FONT_SIZES.small,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddButton;
