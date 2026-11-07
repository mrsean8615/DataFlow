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

type LoginForm = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { colors } = useTheme();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [error, setError] = useState("");

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setError("");
  };

  const validateForm = () => {
    const newErrors: LoginErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setError("");

    if (!validateForm()) return;

    try {
      await login(form.email.trim(), form.password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    }
  };
  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.backgroundElement,
      borderColor: colors.backgroundSelected,
    },
  ];

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
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>DataFlow</Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Warehouse Management
            </Text>
          </View>

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
                style={[inputStyle, errors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSecondary}
                value={form.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                maxLength={254}
              />

              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Password
              </Text>

              <TextInput
                style={[inputStyle, errors.password && styles.inputError]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                value={form.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="current-password"
              />

              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            {error !== "" && <Text style={styles.error}>{error}</Text>}

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
  inputError: {
    borderColor: "#DC2626",
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
    marginTop: SPACING.xs,
  },
  footer: {
    textAlign: "center",
    marginTop: SPACING.lg * 2,
    fontSize: FONT_SIZES.small,
  },
});
