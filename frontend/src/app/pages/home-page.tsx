import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Package,
  AlertTriangle,
  CircleAlert,
  Boxes,
} from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";

import { GetInventory } from "@/services/inventoryService";
import type { InventoryItem } from "@/types/inventoryType";

export default function HomePage() {
  const { colors } = useTheme();

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setLoading(true);
      setError(false);

      GetInventory()
        .then((data: InventoryItem[]) => {
          if (isActive) {
            setInventory(data ?? []);
          }
        })
        .catch((error) => {
          console.error("Inventory API error:", error);

          if (isActive) {
            setError(true);
          }
        })
        .finally(() => {
          if (isActive) {
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const activeInventory = inventory.filter((item) => item.isActive !== false);

  const totalProducts = activeInventory.length;

  const lowStock = activeInventory.filter(
    (item) => item.quantity > 0 && item.quantity <= item.reorderLevel,
  ).length;

  const outOfStock = activeInventory.filter(
    (item) => item.quantity <= 0,
  ).length;

  const totalUnits = activeInventory.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const summaryCards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: COLORS.buttons.primary,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "#D97706",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: CircleAlert,
      color: "#DC2626",
    },
    {
      title: "Total Units",
      value: totalUnits,
      icon: Boxes,
      color: "#16A34A",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Inventory Overview
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Current inventory status
        </Text>
      </View>

      {loading ? (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={COLORS.buttons.primary} />
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            Loading inventory...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: colors.text }]}>
            Unable to load inventory summary.
          </Text>
        </View>
      ) : (
        <FlatList
          data={summaryCards}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          contentContainerStyle={styles.cardList}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const Icon = item.icon;

            return (
              <View
                style={[
                  styles.summaryCard,
                  { backgroundColor: colors.backgroundElement },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <Icon size={22} color={item.color} />
                  </View>
                </View>

                <Text style={[styles.cardValue, { color: colors.text }]}>
                  {item.value.toLocaleString()}
                </Text>

                <Text
                  style={[styles.cardTitle, { color: colors.textSecondary }]}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  sectionHeader: {
    width: "100%",
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
  },
  cardList: {
    gap: SPACING.md,
  },
  cardRow: {
    gap: SPACING.md,
  },
  summaryCard: {
    flex: 1,
    minHeight: 145,
    borderRadius: 12,
    padding: SPACING.md,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: SPACING.sm,
  },
  cardTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: "500",
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
  },
  statusText: {
    fontSize: FONT_SIZES.body,
    textAlign: "center",
  },
});
