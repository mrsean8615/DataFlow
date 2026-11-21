import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import type { RootStackParamList } from "@/types/navigationTypes";
import type { InventoryItem } from "@/types/inventoryType";

import { GetInventory } from "@/services/inventoryService";

import ScreenTitle from "@/components/general/ScreenTitle";
import AddButton from "@/components/general/addButton";

import InventorySummary from "@/app/pages/inventory/inventorySummary";
import InventorySearch from "@/app/pages/inventory/inventorySearch";
import InventoryFilters, {
  InventoryFilter,
} from "@/app/pages/inventory/inventoryFilters";
import InventoryListItem from "@/app/pages/inventory/inventoryListItem";

export default function InventoryPage() {
  const { colors } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Inventory">>();

  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<InventoryFilter>("All");

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
            setInventoryData(data ?? []);
          }
        })
        .catch((error) => {
          console.error("Inventory API error:", error);
          if (isActive) setError(true);
        })
        .finally(() => {
          if (isActive) setLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      if (item.isActive === false) return false;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.sku.toLowerCase().includes(searchValue) ||
        (item.location ?? "").toLowerCase().includes(searchValue);

      const status =
        item.quantity <= 0
          ? "Out of Stock"
          : item.quantity <= item.reorderLevel
            ? "Low Stock"
            : "In Stock";

      const matchesFilter =
        selectedFilter === "All" || status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [inventoryData, search, selectedFilter]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => String(item.inventoryID)}
        renderItem={({ item }) => (
          <InventoryListItem
            item={item}
            onPress={() => navigation.navigate("InventoryDetails", { item })}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <InventorySummary
              inventory={inventoryData.filter(
                (item) => item.isActive !== false,
              )}
            />

            <InventorySearch value={search} onChangeText={setSearch} />

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Products
              </Text>
              <Text
                style={[styles.resultCount, { color: colors.textSecondary }]}
              >
                {filteredInventory.length} items
              </Text>
            </View>

            <InventoryFilters
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.text} />
            ) : (
              <Text style={{ color: colors.textSecondary }}>
                {error
                  ? "Unable to load inventory. Please try again."
                  : inventoryData.length === 0
                    ? "No inventory data available."
                    : "No products match your search or filter."}
              </Text>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.addButtonContainer}>
        <AddButton
          style={{ alignSelf: "center" }}
          onPress={() => navigation.navigate("AddItem")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    gap: 18,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  resultCount: {
    fontSize: 12,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  addButtonContainer: {
    paddingVertical: 10,
  },
});
