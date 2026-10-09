import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import { FONT_SIZES, SPACING } from "@/constants/theme";
import ScreenTitle from "@/components/general/ScreenTitle";
import { InventoryItemInput } from "@/types/inventoryType";
import { AddInventoryItem } from "@/services/inventoryService";

export default function AddItem() {
  const { colors } = useTheme();

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit() {
    if (!sku.trim() || !name.trim()) {
      Alert.alert("Error", "SKU and Name are required fields.");
      return;
    }
    const newItem: InventoryItemInput = {
      sku: sku.trim(),
      name: name.trim(),
      description: description.trim() || "",
      quantity: Number(quantity) || 0,
      reorderLevel: Number(reorderLevel) || 0,
      location: location.trim() || "",
    };

    try {
      const result = await AddInventoryItem(newItem);

      if (result.returnCode === 0) {
        Alert.alert("Success", result.returnMessage);
        router.push("/pages/inventory/inventory-page");
      } else {
        Alert.alert(
          "Error",
          result.returnMessage || "Failed to add item. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error adding inventory item:", error);

      Alert.alert("Error", "Something went wrong while adding the item.");
    }
  }

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.backgroundElement,
      borderColor: colors.backgroundSelected,
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Add Inventory Item
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>SKU *</Text>
      <TextInput
        style={inputStyle}
        value={sku}
        onChangeText={setSku}
        placeholder="e.g. BOX-001"
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="characters"
      />

      <Text style={[styles.label, { color: colors.text }]}>Item Name *</Text>
      <TextInput
        style={inputStyle}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        style={[inputStyle, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Optional description"
        placeholderTextColor={colors.textSecondary}
        multiline
      />

      <Text style={[styles.label, { color: colors.text }]}>Quantity</Text>
      <TextInput
        style={inputStyle}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.text }]}>Reorder Level</Text>
      <TextInput
        style={inputStyle}
        value={reorderLevel}
        onChangeText={setReorderLevel}
        keyboardType="number-pad"
        placeholder="10"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.text }]}>Location</Text>
      <TextInput
        style={inputStyle}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Warehouse A"
        placeholderTextColor={colors.textSecondary}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Item</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  heading: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.body,
    fontWeight: "600",
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.body,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#1E4078",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZES.body,
    fontWeight: "bold",
  },
});
