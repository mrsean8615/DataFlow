import { createContext, useContext, useState, type ReactNode } from "react";

import type { User } from "@/types/UserType";

const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    firstName: "Sean",
    lastName: "Payne",
    email: "sean@dataflow.com",
    password: "password123",
    role: "Admin",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Smith",
    email: "john@dataflow.com",
    password: "password123",
    role: "Employee",
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@dataflow.com",
    password: "password123",
    role: "Manager",
  },
];

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = user !== null;

  // Temporary mock login
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const matchedUser = MOCK_USERS.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password,
      );

      if (!matchedUser) {
        throw new Error("Invalid email or password.");
      }

      const { password: _, ...authenticatedUser } = matchedUser;

      setUser(authenticatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}
