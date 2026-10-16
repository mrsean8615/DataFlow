import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { RootStackParamList } from "@/types/navigationTypes";
import { useTheme } from "@/context/ThemeContext";
import { SPACING, COLORS } from "@/constants/theme";
import {
  Home,
  ShelvingUnit,
  User,
  Truck,
  ArrowLeftRight,
} from "lucide-react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Footer() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.headerFooterBackground,
        },
      ]}
    >
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <User size={36} color={COLORS.dark.text} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Shipments")}>
        <Truck size={36} color={COLORS.dark.text} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Home")}>
        <Home size={36} color={COLORS.dark.text} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Inventory")}>
        <ShelvingUnit size={36} color={COLORS.dark.text} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Orders")}>
        <ArrowLeftRight size={36} color={COLORS.dark.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
});
