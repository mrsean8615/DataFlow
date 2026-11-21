import { LoginResponse } from "@/types/UserType";
import { getToken } from "./tokenStorage";
import { CreateUserInput, GetUsersOutput } from "@/types/AdminTypes";
import { BaseOutputType } from "@/types/BaseTypes";

import { demoUsers } from "@/data/demoUsers";
import { useDemoData } from "@/app/utils/dataUtils";

const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const demoMode = useDemoData(true);

  if (demoMode) {
    const user = demoUsers.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!user || password !== "password123") {
      throw new Error("Invalid email or password.");
    }

    return {
      returnCode: 0,
      returnMessage: "Demo login successful.",
      token: `demo-token-${user.id}`,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
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

export async function GetUsers(requester: number): Promise<GetUsersOutput> {
  const demoData = useDemoData(demoUsers);
  if (demoData) {
    return {
      returnCode: 0,
      returnMessage: "Users retrieved successfully.",
      users: demoData.filter((user) => user.id !== String(requester)),
    };
  }
  const token = await getToken();
  const response = await fetch(`${API_URL}/api/auth/GetUsers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ requester }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }

    throw new Error("Unable to fetch users. Please try again.");
  }

  return response.json();
}

export async function CreateUser(
  input: CreateUserInput,
): Promise<BaseOutputType> {
  const token = await getToken();
  const response = await fetch(`${API_URL}/api/auth/CreateUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }

    throw new Error("Unable to create user. Please try again.");
  }

  return response.json();
}
