import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types/navigationTypes";

import InventoryCard from "@/components/inventory/inventory-card";
import ScreenTitle from "@/components/general/ScreenTitle";

import { GetInventory } from "@/services/inventoryService";
import AddButton from "@/components/general/addButton";

export default function InventoryPage() {
  const { colors } = useTheme();
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Inventory">>();

  useFocusEffect(
    useCallback(() => {
      getInventoryData();
    }, []),
  );

  function getInventoryData() {
    GetInventory()
      .then((data) => {
        return setInventoryData(data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <ScreenTitle>Inventory</ScreenTitle>
        {inventoryData.length > 0 ? (
          inventoryData.map((item, index) => (
            <InventoryCard
              key={index}
              InventoryItem={item}
              onPress={() => navigation.navigate("InventoryDetails", { item })}
            />
          ))
        ) : (
          <Text style={{ color: colors.text }}>
            No inventory data available.
          </Text>
        )}
      </View>
      <AddButton
        style={{ alignSelf: "center" }}
        onPress={() => navigation.navigate("AddItem")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
