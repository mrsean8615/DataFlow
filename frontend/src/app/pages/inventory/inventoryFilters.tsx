import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export type InventoryFilter = "All" | "Low Stock" | "Out of Stock";

interface Props {
  selected: InventoryFilter;
  onSelect: (filter: InventoryFilter) => void;
}

const filters: InventoryFilter[] = ["All", "Low Stock", "Out of Stock"];

export default function InventoryFilters({ selected, onSelect }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const active = selected === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onSelect(filter)}
            style={[
              styles.filter,
              {
                backgroundColor: active
                  ? colors.headerFooterBackground
                  : colors.backgroundElement,
              },
            ]}
          >
            <Text
              style={{
                color: active ? "#FFFFFF" : colors.textSecondary,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
