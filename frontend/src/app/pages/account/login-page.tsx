import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { COLORS, SPACING, FONT_SIZES } from "@/constants/theme";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* App Branding */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>DataFlow</Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Warehouse Management
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={[styles.heading, { color: colors.text }]}>
              Welcome Back
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              Sign in to access your inventory.
            </Text>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Email Address
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.backgroundSelected,
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Password
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.backgroundSelected,
                  },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Error Message */}
            {error !== "" && <Text style={styles.error}>{error}</Text>}

            {/* Login Button */}
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.buttons.primary,
                  opacity: isLoading ? 0.6 : 1,
                },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <Text style={[styles.footer, { color: colors.textSecondary }]}>
            DataFlow Inventory Management
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    padding: SPACING.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.lg * 2,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    marginTop: SPACING.xs,
  },
  form: {
    width: "100%",
  },
  heading: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZES.body,
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.small,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZES.body,
  },
  button: {
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    minHeight: 52,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZES.body,
    fontWeight: "bold",
  },
  error: {
    color: "#DC2626",
    fontSize: FONT_SIZES.small,
    marginBottom: SPACING.sm,
  },
  footer: {
    textAlign: "center",
    marginTop: SPACING.lg * 2,
    fontSize: FONT_SIZES.small,
  },
});
