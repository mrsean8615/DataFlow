import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserPlus, Users } from "lucide-react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "@/context/ThemeContext";
import type { AdminStackParamList } from "@/types/navigationTypes";
import { GetUsers } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types/UserType";

export default function AdminPage() {
  const { colors } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && user?.id) {
        fetchUsers();
      } else {
        setUsers([]);
        setLoading(false);
      }
    }, [isAuthenticated, user?.id]),
  );

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await GetUsers(Number(user?.id));

      if (response.returnCode !== 0) {
        throw new Error(response.returnMessage);
      }

      setUsers(response.users);
    } catch (err) {
      console.error("Error fetching users:", err);

      setError(
        err instanceof Error ? err.message : "An unknown error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "#D97706";
      case "Manager":
        return "#2563EB";
      default:
        return "#16A34A";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.heading}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Administration
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Manage users and their access
          </Text>
        </View>
      </View>

      <View style={styles.summary}>
        <Users size={22} color={colors.textSecondary} />

        <View>
          <Text style={[styles.userCount, { color: colors.text }]}>
            {users.length} Users
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            Registered in DataFlow
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <UserPlus size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Create User</Text>
      </Pressable>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        All Users
      </Text>

      {loading && <ActivityIndicator size="large" color="#2563EB" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={{ color: colors.textSecondary }}>No users found.</Text>
          }
          renderItem={({ item }) => {
            const fullName = `${item.firstName} ${item.lastName}`;
            const roleColor = getRoleColor(item.role);

            return (
              <View
                style={[
                  styles.userCard,
                  { backgroundColor: colors.backgroundElement },
                ]}
              >
                <View style={styles.userInfo}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: colors.backgroundSelected },
                    ]}
                  >
                    <Text style={[styles.avatarText, { color: colors.text }]}>
                      {`${item.firstName[0] ?? ""}${item.lastName[0] ?? ""}`}
                    </Text>
                  </View>

                  <View style={styles.userDetails}>
                    <Text style={[styles.userName, { color: colors.text }]}>
                      {fullName}
                    </Text>

                    <Text
                      style={[styles.email, { color: colors.textSecondary }]}
                    >
                      {item.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.roleBadge,
                    { backgroundColor: `${roleColor}20` },
                  ]}
                >
                  <Text style={[styles.roleText, { color: roleColor }]}>
                    {item.role}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#80808015",
    marginBottom: 16,
  },
  userCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  errorText: {
    color: "#DC2626",
    marginBottom: 12,
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
  userCard: {
    padding: 14,
    borderRadius: 10,
    gap: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
  },
  roleBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
