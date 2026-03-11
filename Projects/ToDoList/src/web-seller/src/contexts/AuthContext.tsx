import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginAPI, SignupAPI, profileAPI } from "@/api/auth.api";
import api from "@/api/axios";

interface User {
  id: string;
  email: string;
  name: string;
  storeName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  sellerId: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string,
    storeName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Refresh token on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await refreshAccessToken();
        if (!token) throw new Error();

        const profileRes = await profileAPI(token);
        const profile = profileRes.user;

        const userData: User = {
          id: profile._id,
          email: profile.email,
          name: `${profile.fName} ${(profile.lName || '').trim()}`.trim(),
          storeName: profile.storeName || '',
        };

        setUser(userData);
        setSellerId(profile._id);
        setIsAuthenticated(true);
        localStorage.setItem("seller_user", JSON.stringify(userData));
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔁 Refresh Access Token
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const res = await api.get("/seller/refresh", {
        withCredentials: true,
      });

      const token = res.data.token;
      setAccessToken(token);
      return token;
    } catch {
      return null;
    }
  };

  // 🔐 Login
  const login = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);

      if (!res.token) {
        return { success: false, error: "Invalid credentials" };
      }

      setAccessToken(res.token);

      const profileRes = await profileAPI(res.token);
      const profile = profileRes.user;

      const userData: User = {
        id: profile._id,
        email: profile.email,
        name: `${profile.fName} ${(profile.lName || '').trim()}`.trim(),
        storeName: profile.storeName || '',
      };

      setUser(userData);
      setSellerId(profile._id);
      setIsAuthenticated(true);
      localStorage.setItem("seller_user", JSON.stringify(userData));

      return { success: true };
    } catch {
      return { success: false, error: "Login failed" };
    }
  };

  // 📝 Signup
  const signup = async (
    email: string,
    password: string,
    name: string,
    storeName: string
  ) => {
    try {
      const res = await SignupAPI(email, password, name, storeName);

      setAccessToken(res.token);

      const userData: User = {
        id: res.user._id,
        email,
        name,
        storeName,
      };

      setUser(userData);
      setSellerId(res.user._id);
      setIsAuthenticated(true);
      localStorage.setItem("seller_user", JSON.stringify(userData));

      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      return { success: false, error: message };
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setSellerId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("seller_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        accessToken,
        sellerId,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🎣 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
