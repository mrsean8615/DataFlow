import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { loginUser } from "@/services/authService";

import type { User } from "@/types/UserType";
import {
  removeToken,
  saveToken,
  getToken,
  saveUser,
  getStoredUser,
  removeUser,
} from "@/services/tokenStorage";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const token = await getToken();
        const storedUser = await getStoredUser();

        if (token && storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error restoring authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.returnCode !== 0) {
        throw new Error(result.returnMessage);
      }

      const loggedInUser: User = {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        role: result.role,
      };

      await saveToken(result.token);
      await saveUser(loggedInUser);
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await removeToken();
    await removeUser();
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
