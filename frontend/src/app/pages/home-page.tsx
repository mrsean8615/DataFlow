import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";

import { getTestData } from "@/services/testapi";
import ScreenTitle from "@/components/general/ScreenTitle";
import Card from "@/components/general/Card";

export default function HomePage() {
  const [testData, setTestData] = useState<any[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    getTestData()
      .then((data) => {
        setTestData(data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenTitle>Home</ScreenTitle>
      <Card>
        <Text style={styles.bodyText}>
          API Response:
          {testData ? JSON.stringify(testData) : "Loading data..."}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.lg,
  },
  bodyText: {
    fontSize: FONT_SIZES.body,
    textAlign: "center",
    color: COLORS.dark.text,
  },
});
