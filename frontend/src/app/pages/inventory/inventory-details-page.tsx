import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";

import type { RootStackParamList } from "@/types/navigationTypes";
import { useTheme } from "@/context/ThemeContext";
import ScreenTitle from "@/components/general/ScreenTitle";
import { SPACING, FONT_SIZES } from "@/constants/theme";

export default function InventoryDetailsPage() {
  const { colors } = useTheme();

  const route = useRoute<RouteProp<RootStackParamList, "InventoryDetails">>();

  const item = route.params.item;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ScreenTitle>{item.name}</ScreenTitle>

      <View
        style={[styles.card, { backgroundColor: colors.backgroundElement }]}
      >
        <DetailRow label="SKU" value={item.sku} colors={colors} />
        <DetailRow
          label="Description"
          value={item.description || "No description"}
          colors={colors}
        />
        <DetailRow
          label="Quantity"
          value={String(item.quantity)}
          colors={colors}
        />
        <DetailRow
          label="Reorder Level"
          value={String(item.reorderLevel)}
          colors={colors}
        />
        <DetailRow
          label="Location"
          value={item.location || "Not specified"}
          colors={colors}
        />
      </View>
    </ScrollView>
  );
}

function DetailRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: { text: string; textSecondary: string };
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  card: {
    padding: SPACING.md,
    borderRadius: 12,
    gap: 18,
  },
  row: {
    gap: 4,
  },
  label: {
    fontSize: FONT_SIZES.small,
  },
  value: {
    fontSize: FONT_SIZES.body,
    fontWeight: "600",
  },
});
