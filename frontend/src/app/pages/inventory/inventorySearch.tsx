import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Search, X } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function InventorySearch({ value, onChangeText }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundElement }]}
    >
      <Search size={20} color={colors.textSecondary} />

      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Search SKU, name, or location..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <X size={19} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 12,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});
