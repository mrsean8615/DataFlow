import { View, Text } from "react-native";
import { useState, useEffect } from "react";

import { getTestData } from "@/services/testapi";

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
    <View>
      <Text>{JSON.stringify(testData)}</Text>
    </View>
  );
}
