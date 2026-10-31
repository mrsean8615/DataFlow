import { createContext, useContext, useState, type ReactNode } from "react";

import type { User } from "@/types/UserType";

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
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      // TODO: Replace with C# API authentication request.
      const mockUser: User = {
        id: "1",
        firstName: "Warehouse",
        lastName: "Employee",
        email: email,
        role: "Employee",
      };

      setUser(mockUser);
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
