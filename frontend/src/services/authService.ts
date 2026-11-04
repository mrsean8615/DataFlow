import { LoginResponse } from "@/types/UserType";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid email or password.");
    }

    throw new Error("Unable to log in. Please try again.");
  }

  return response.json();
}
