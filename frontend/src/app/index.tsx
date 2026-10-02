import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { COLORS, FONT_SIZES, SPACING } from "@/constants/theme";

import { getTestData } from "@/services/testapi";
import ScreenTitle from "@/components/ScreenTitle";
import Card from "@/components/general/Card";
import PrimaryButton from "@/components/general/PrimaryButton";

export default function HomeScreen() {
  const [testData, setTestData] = useState<any[]>([]);
  useEffect(() => {
    getTestData()
      .then((data) => {
        console.log("API data:", data);
        setTestData(data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScreenTitle>DataFlow</ScreenTitle>
      <Card>
        <Text style={styles.bodyText}>
          API Response:{testData ? JSON.stringify(testData) : "Loading data..."}
        </Text>
      </Card>
      <PrimaryButton title="Start up" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.backgroundSelected,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  bodyText: {
    color: COLORS.dark.text,
    fontSize: FONT_SIZES.body,
    textAlign: "center",
  },
});
