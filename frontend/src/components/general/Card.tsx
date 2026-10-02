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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android
    elevation: 5,
  },
});

export default Card;
