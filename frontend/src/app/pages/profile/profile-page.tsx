import { View, Text, StyleSheet, Pressable } from "react-native";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { colors } = useTheme();
  console.log(user);

  if (!isAuthenticated || !user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>
          No user is currently signed in.
        </Text>
      </View>
    );
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View
          style={[styles.avatar, { backgroundColor: COLORS.buttons.primary }]}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {user.firstName} {user.lastName}
        </Text>

        <Text style={[styles.role, { color: colors.textSecondary }]}>
          {user.role}
        </Text>
      </View>

      {/* Employee Information */}
      <View
        style={[styles.infoCard, { backgroundColor: colors.backgroundElement }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Employee Information
        </Text>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Employee ID
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>{user.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Email
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Role
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.role}
          </Text>
        </View>
      </View>

      {/* Logout */}
      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    alignItems: "center",
    marginVertical: SPACING.lg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
  },
  role: {
    fontSize: FONT_SIZES.body,
    marginTop: SPACING.xs,
  },
  infoCard: {
    padding: SPACING.md,
    borderRadius: 12,
    gap: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: "bold",
    marginBottom: SPACING.xs,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.small,
  },
  value: {
    fontSize: FONT_SIZES.body,
    fontWeight: "500",
    flexShrink: 1,
    textAlign: "right",
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZES.body,
    fontWeight: "bold",
  },
});
