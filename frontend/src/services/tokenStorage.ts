import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import type { User } from "@/types/UserType";

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("authToken", token);
  } else {
    await SecureStore.setItemAsync("authToken", token);
  }
}

export async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("authToken");
  }

  return await SecureStore.getItemAsync("authToken");
}

export async function removeToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("authToken");
  } else {
    await SecureStore.deleteItemAsync("authToken");
  }
}

export async function saveUser(user: User) {
  const value = JSON.stringify(user);

  if (Platform.OS === "web") {
    localStorage.setItem("authUser", value);
  } else {
    await SecureStore.setItemAsync("authUser", value);
  }
}

export async function getStoredUser(): Promise<User | null> {
  const value =
    Platform.OS === "web"
      ? localStorage.getItem("authUser")
      : await SecureStore.getItemAsync("authUser");

  return value ? (JSON.parse(value) as User) : null;
}

export async function removeUser() {
  if (Platform.OS === "web") {
    localStorage.removeItem("authUser");
  } else {
    await SecureStore.deleteItemAsync("authUser");
  }
}
