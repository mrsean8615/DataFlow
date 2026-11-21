import { View, Text, StyleSheet, Pressable } from "react-native";
import { MapPin, Package, ChevronRight } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import { InventoryItem } from "@/types/inventoryType";

interface Props {
  item: InventoryItem;
  onPress: () => void;
}

export default function InventoryListItem({ item, onPress }: Props) {
  const { colors } = useTheme();

  const status =
    item.quantity <= 0
      ? "Out of Stock"
      : item.quantity <= item.reorderLevel
        ? "Low Stock"
        : "In Stock";

  const statusColor =
    status === "In Stock"
      ? "#16A34A"
      : status === "Low Stock"
        ? "#D97706"
        : "#DC2626";

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors.backgroundElement }]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.backgroundSelected },
            ]}
          >
            <Package size={22} color={colors.text} />
          </View>

          <View style={styles.nameContainer}>
            <Text
              style={[styles.name, { color: colors.text }]}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <Text style={[styles.sku, { color: colors.textSecondary }]}>
              SKU: {item.sku}
            </Text>
          </View>
        </View>

        <View style={[styles.status, { backgroundColor: statusColor + "20" }]}>
          <Text style={{ color: statusColor, fontSize: 10, fontWeight: "700" }}>
            {status}
          </Text>
        </View>
      </View>

      {item.category ? (
        <Text style={[styles.category, { color: colors.textSecondary }]}>
          {item.category}
        </Text>
      ) : null}

      <View
        style={[styles.divider, { backgroundColor: colors.backgroundSelected }]}
      />

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Quantity
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {item.quantity.toLocaleString()} {item.unitOfMeasure ?? "Each"}
          </Text>
        </View>

        <View style={styles.detail}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Reorder Level
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {item.reorderLevel.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.location}>
        <MapPin size={14} color={colors.textSecondary} />
        <Text style={[styles.locationText, { color: colors.textSecondary }]}>
          {item.location || "No location assigned"}
        </Text>
        <ChevronRight size={17} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  sku: {
    fontSize: 11,
  },
  status: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },
  category: {
    fontSize: 12,
  },
  divider: {
    height: 1,
  },
  details: {
    flexDirection: "row",
    gap: 12,
  },
  detail: {
    flex: 1,
    gap: 5,
  },
  detailLabel: {
    fontSize: 10,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    flex: 1,
    fontSize: 12,
  },
});
