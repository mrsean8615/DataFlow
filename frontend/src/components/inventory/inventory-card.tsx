import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

import { InventoryItem } from "@/types/inventoryType";
import { FONT_SIZES, SPACING } from "@/constants/theme";

export default function InventoryCard({
  InventoryItem,
}: {
  InventoryItem: InventoryItem;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundElement }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {InventoryItem.name}
      </Text>

      <Text style={[styles.count, { color: colors.text }]}>
        {InventoryItem.quantity}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: SPACING.sm,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  title: {
    fontSize: FONT_SIZES.subtitle,
  },
  count: {
    fontSize: 18,
    textAlign: "right",
  },
});
