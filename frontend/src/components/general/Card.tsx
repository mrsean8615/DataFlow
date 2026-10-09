import { StyleSheet, View } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";

function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.dark.backgroundElement,
    padding: SPACING.md,
    borderRadius: 12,
    marginVertical: SPACING.sm,

    // iOS
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",

    // Android
    elevation: 5,
  },
});

export default Card;
