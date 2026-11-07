import {
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  View,
  Platform,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "@/context/ThemeContext";
import { FONT_SIZES, SPACING } from "@/constants/theme";
import { InventoryItemInput } from "@/types/inventoryType";
import { AddInventoryItem } from "@/services/inventoryService";

type ItemForm = {
  sku: string;
  name: string;
  description: string;
  quantity: string;
  reorderLevel: string;
  location: string;
};

type ItemErrors = Partial<Record<keyof ItemForm, string>>;

export default function AddItem() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [form, setForm] = useState<ItemForm>({
    sku: "",
    name: "",
    description: "",
    quantity: "0",
    reorderLevel: "0",
    location: "",
  });

  const [errors, setErrors] = useState<ItemErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ItemForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors: ItemErrors = {};

    if (!form.sku.trim()) {
      newErrors.sku = "SKU is required.";
    }

    if (!form.name.trim()) {
      newErrors.name = "Item name is required.";
    }

    // Quantity must be a non-negative whole number.
    if (!/^\d+$/.test(form.quantity.trim())) {
      newErrors.quantity = "Enter a valid non-negative whole number.";
    }

    // Reorder level must also be a non-negative whole number.
    if (!/^\d+$/.test(form.reorderLevel.trim())) {
      newErrors.reorderLevel = "Enter a valid non-negative whole number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  async function handleSubmit() {
    if (isSubmitting || !validateForm()) return;

    const newItem: InventoryItemInput = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      quantity: Number(form.quantity),
      reorderLevel: Number(form.reorderLevel),
      location: form.location.trim(),
    };

    try {
      setIsSubmitting(true);

      const result = await AddInventoryItem(newItem);

      if (result.returnCode === 0) {
        if (Platform.OS === "web") {
          window.alert(`Success\n\n${result.returnMessage}`);
          navigation.goBack();
        } else {
          Alert.alert("Success", result.returnMessage, [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } else {
        showMessage("Error", result.returnMessage || "Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding inventory item:", error);

      showMessage(
        "Error",
        "The request failed. Check whether the item was saved before trying again.",
      );
    } finally {
      setIsSubmitting(false);
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

  // Reusable field error display.
  const renderError = (field: keyof ItemForm) => {
    if (!errors[field]) return null;

    return <Text style={styles.error}>{errors[field]}</Text>;
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Add Inventory Item
      </Text>

      {/* SKU */}
      <Text style={[styles.label, { color: colors.text }]}>SKU *</Text>
      <TextInput
        style={[inputStyle, errors.sku && styles.inputError]}
        value={form.sku}
        onChangeText={(value) => handleChange("sku", value)}
        placeholder="e.g. BOX-001"
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="characters"
        maxLength={30}
      />
      {renderError("sku")}

      {/* Item Name */}
      <Text style={[styles.label, { color: colors.text }]}>Item Name *</Text>
      <TextInput
        style={[inputStyle, errors.name && styles.inputError]}
        value={form.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Enter item name"
        placeholderTextColor={colors.textSecondary}
        maxLength={100}
      />
      {renderError("name")}

      {/* Description */}
      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        style={[inputStyle, styles.multiline]}
        value={form.description}
        onChangeText={(value) => handleChange("description", value)}
        placeholder="Optional description"
        placeholderTextColor={colors.textSecondary}
        multiline
        maxLength={500}
      />

      {/* Quantity */}
      <Text style={[styles.label, { color: colors.text }]}>Quantity</Text>
      <TextInput
        style={[inputStyle, errors.quantity && styles.inputError]}
        value={form.quantity}
        onChangeText={(value) => handleChange("quantity", value)}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
        maxLength={9}
      />
      {renderError("quantity")}

      {/* Reorder Level */}
      <Text style={[styles.label, { color: colors.text }]}>Reorder Level</Text>
      <TextInput
        style={[inputStyle, errors.reorderLevel && styles.inputError]}
        value={form.reorderLevel}
        onChangeText={(value) => handleChange("reorderLevel", value)}
        keyboardType="number-pad"
        placeholder="10"
        placeholderTextColor={colors.textSecondary}
        maxLength={9}
      />
      {renderError("reorderLevel")}

      {/* Location */}
      <Text style={[styles.label, { color: colors.text }]}>Location</Text>
      <TextInput
        style={inputStyle}
        value={form.location}
        onChangeText={(value) => handleChange("location", value)}
        placeholder="e.g. Warehouse A"
        placeholderTextColor={colors.textSecondary}
        maxLength={100}
      />

      <Pressable
        style={[styles.submitButton, { opacity: isSubmitting ? 0.6 : 1 }]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitText}>
          {isSubmitting ? "Adding Item..." : "Add Item"}
        </Text>
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
  inputError: {
    borderColor: "#DC2626",
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  error: {
    color: "#DC2626",
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
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
