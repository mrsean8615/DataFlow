import type { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";

type MainLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function MainLayout({ title, children }: MainLayoutProps) {
  return (
    <View style={styles.container}>
      <Header title={title} />

      <View style={styles.content}>{children}</View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
