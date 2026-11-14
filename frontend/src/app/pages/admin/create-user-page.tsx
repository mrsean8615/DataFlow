import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff, ArrowLeft } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
import type { RootStackParamList } from "@/types/navigationTypes";
import { useAuth } from "@/context/AuthContext";
import { CreateUser } from "@/services/authService";

type UserRole = "Admin" | "Manager" | "Employee";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Employee",
};

export default function CreateUserPage() {
  const { colors } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Clear the error when the user edits the field.
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
    } else if (form.firstName.trim().length > 50) {
      newErrors.firstName = "First name cannot exceed 50 characters.";
    }

    // Last name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
    } else if (form.lastName.trim().length > 50) {
      newErrors.lastName = "Last name cannot exceed 50 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    // if (!form.password) {
    //   newErrors.password = "Password is required.";
    // } else if (form.password.length < 8) {
    //   newErrors.password = "Password must be at least 8 characters.";
    // } else if (!/[A-Z]/.test(form.password)) {
    //   newErrors.password = "Password must contain an uppercase letter.";
    // } else if (!/[a-z]/.test(form.password)) {
    //   newErrors.password = "Password must contain a lowercase letter.";
    // } else if (!/[0-9]/.test(form.password)) {
    //   newErrors.password = "Password must contain a number.";
    // }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm the password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleCreateUser = async () => {
    try {
      // Stop submission if validation fails.
      if (!validateForm()) {
        return;
      }

      const userData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role,
        password: form.password,
      };

      const response = await CreateUser({
        requester: Number(user?.id),
        ...userData,
      });

      if (response.returnCode !== 0) {
        throw new Error(response.returnMessage);
      }

      showMessage("User Created", "");
      navigation.goBack();
    } catch (error) {
      console.error("Create user error:", error);

      showMessage(
        "Error",
        "Something went wrong while processing the user information. Please try again.",
      );
    }
  };

  const renderInput = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    options?: {
      secureTextEntry?: boolean;
      keyboardType?: "default" | "email-address";
      autoCapitalize?: "none" | "sentences" | "words" | "characters";
      showToggle?: boolean;
      showValue?: boolean;
      toggleVisibility?: () => void;
    },
  ) => {
    const isPassword = options?.secureTextEntry;

    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: errors[field]
                ? "#DC2626"
                : colors.backgroundSelected,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={form[field] as string}
            onChangeText={(value) => updateField(field, value as never)}
            secureTextEntry={isPassword && !options?.showValue}
            keyboardType={options?.keyboardType ?? "default"}
            autoCapitalize={options?.autoCapitalize ?? "sentences"}
            autoCorrect={false}
          />

          {options?.showToggle && (
            <Pressable onPress={options.toggleVisibility} hitSlop={10}>
              {options.showValue ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </Pressable>
          )}
        </View>

        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>Create User</Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter the information below to create a new DataFlow user.
        </Text>

        {/* Personal Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Personal Information
        </Text>

        {renderInput("First Name", "firstName", "Enter first name")}

        {renderInput("Last Name", "lastName", "Enter last name")}

        {renderInput("Email Address", "email", "example@email.com", {
          keyboardType: "email-address",
          autoCapitalize: "none",
        })}

        {/* Account Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Account Information
        </Text>

        {renderInput("Password", "password", "Enter password", {
          secureTextEntry: true,
          showToggle: true,
          showValue: showPassword,
          toggleVisibility: () => setShowPassword(!showPassword),
        })}

        <Text style={[styles.passwordHint, { color: colors.textSecondary }]}>
          Minimum 8 characters, including an uppercase letter, lowercase letter,
          and number.
        </Text>

        {renderInput(
          "Confirm Password",
          "confirmPassword",
          "Re-enter password",
          {
            secureTextEntry: true,
            showToggle: true,
            showValue: showConfirmPassword,
            toggleVisibility: () =>
              setShowConfirmPassword(!showConfirmPassword),
          },
        )}

        {/* User Role */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          User Role
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>
          Select a role
        </Text>

        <View style={styles.roleContainer}>
          {(["Admin", "Manager", "Employee"] as UserRole[]).map((role) => {
            const selected = form.role === role;

            return (
              <Pressable
                key={role}
                style={[
                  styles.roleOption,
                  {
                    backgroundColor: selected
                      ? colors.backgroundSelected
                      : colors.backgroundElement,
                    borderColor: selected
                      ? "#2563EB"
                      : colors.backgroundSelected,
                  },
                ]}
                onPress={() => updateField("role", role)}
              >
                <Text
                  style={[
                    styles.roleText,
                    {
                      color: colors.text,
                      fontWeight: selected ? "bold" : "normal",
                    },
                  ]}
                >
                  {role}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Submit Button */}
        <Pressable style={styles.createButton} onPress={handleCreateUser}>
          <Text style={styles.createButtonText}>Create User</Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.cancelButtonText, { color: colors.text }]}>
            Cancel
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 5,
  },
  passwordHint: {
    fontSize: 12,
    marginTop: -9,
    marginBottom: 16,
    lineHeight: 18,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  roleOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderWidth: 1,
    borderRadius: 9,
  },
  roleText: {
    fontSize: 13,
  },
  createButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 12,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
