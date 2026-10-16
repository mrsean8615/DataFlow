import { View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Settings, ArrowLeft } from "lucide-react-native";

import type { RootStackParamList } from "@/types/navigationTypes";
import { useTheme } from "@/context/ThemeContext";
import { HEADER, FONT_SIZES, FONTS, SPACING } from "@/constants/theme";

type HeaderProps = {
  title: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.headerFooterBackground,
          paddingTop: insets.top + SPACING.md,
        },
      ]}
    >
      <View style={styles.navigationRow}>
        <View style={styles.sideButton}>
          {navigation.canGoBack() && (
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={10}
              style={styles.iconButton}
            >
              <ArrowLeft size={HEADER.iconSize} color={HEADER.titleColor} />
            </Pressable>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={[styles.sideButton, styles.rightButton]}>
          <Pressable
            onPress={() => navigation.navigate("Settings")}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            hitSlop={10}
            style={styles.iconButton}
          >
            <Settings size={HEADER.iconSize} color={HEADER.titleColor} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: HEADER.horizontalPadding,
    paddingBottom: HEADER.bottomPadding,
  },
  navigationRow: {
    minHeight: HEADER.buttonSize,
    flexDirection: "row",
    alignItems: "center",
  },
  sideButton: {
    width: HEADER.buttonSize,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightButton: {
    alignItems: "flex-end",
  },
  iconButton: {
    width: HEADER.buttonSize,
    height: HEADER.buttonSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: HEADER.buttonSize / 2,
  },
  title: {
    flex: 1,
    fontFamily: FONTS.rounded,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: "700",
    letterSpacing: HEADER.titleLetterSpacing,
    textAlign: "center",
    color: HEADER.titleColor,
  },
});
