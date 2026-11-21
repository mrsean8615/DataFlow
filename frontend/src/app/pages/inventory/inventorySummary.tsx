import { View, Text, StyleSheet } from "react-native";
import { Package, AlertTriangle, PackageX, Layers } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import { InventoryItem } from "@/types/inventoryType";

interface Props {
  inventory: InventoryItem[];
}

export default function InventorySummary({ inventory }: Props) {
  const { colors } = useTheme();

  const lowStock = inventory.filter(
    (item) => item.quantity > 0 && item.quantity <= item.reorderLevel,
  ).length;

  const outOfStock = inventory.filter((item) => item.quantity <= 0).length;

  const totalUnits = inventory.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const stats = [
    {
      label: "Products",
      value: inventory.length,
      Icon: Package,
      color: "#3B82F6",
    },
    {
      label: "Low Stock",
      value: lowStock,
      Icon: AlertTriangle,
      color: "#D97706",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      Icon: PackageX,
      color: "#DC2626",
    },
    {
      label: "Total Units",
      value: totalUnits.toLocaleString(),
      Icon: Layers,
      color: "#16A34A",
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map(({ label, value, Icon, color }) => (
        <View
          key={label}
          style={[styles.card, { backgroundColor: colors.backgroundElement }]}
        >
          <Icon size={21} color={color} />
          <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48%",
    flexGrow: 1,
    padding: 14,
    borderRadius: 12,
    gap: 7,
  },
  value: {
    fontSize: 23,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
  },
});
