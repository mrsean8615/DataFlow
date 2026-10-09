import { View, Image, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DataflowLogo from "@/assets/images/svg/dataflow_logo_with_background.svg";

export default function Header() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.headerFooterBackground },
        { paddingTop: insets.top + 16 },
      ]}
    >
      <DataflowLogo width={250} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    textAlign: "center",
  },
});
