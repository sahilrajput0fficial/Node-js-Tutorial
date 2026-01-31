import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, SignupAPI ,profileAPI} from "@/./api/auth.api.js";
import api from "@/./api/axios.js";
interface User {
  id: string;
  email: string;
  name: string;
  storeName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string,
    storeName: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  accessToken: string;
  sellerId: string;
  
  isAuthenticated : boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: "1",
  email: "demo@seller.com",
  name: "John Seller",
  storeName: "My Awesome Store",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("seller_user");
      if (storedUser && accessToken) {
        setisAuthenticated(true)
        setUser(JSON.parse(storedUser));
      } else {
        await refreshAccessToken();
        const resp = await profileAPI(accessToken);
        setUser({
          id: resp._id,
          email:resp.email,
          name : `${resp.fName} ${resp.lName}`,
          storeName : resp.store,

        })

      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAPI(email, password);
      if (response.message === "Login Successful") {
        // Assuming the backend returns user data or we need to fetch it
        // For now, since loginAPI returns {message, token}, we set token
        setisAuthenticated(true);
        setAccessToken(response.token);
        // Since it's seller login but using user auth, we might need to adjust
        // For now, assume we need to set a dummy user or fetch profile
        // Let's assume we set sellerId to something, but since no user returned, perhaps fetch profile
        // To keep simple, set sellerId to a placeholder or from token decode
        // But for now, let's set sellerId to 'logged_in' or something // TODO: get from response or profile
        return { success: true, message: "Successfully Logged In" };
      } else {
        return { success: false, error: response.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };
  const refreshAccessToken = async () => {
    try {
      const res = await api.get("/seller/refresh", {
        withCredentials: true,
      });
      const token = res.token;
      setAccessToken(res.data.token);
      setisAuthenticated(true);
      return token;
    } catch {
      logout();
      return null;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    storeName: string,
  ) => {
    const data = await SignupAPI(email, password, name, storeName);
    if (email && password.length >= 6 && name && storeName) {
      const newUser: User = {
        id: data.user._id,
        email,
        name,
        storeName,
      };
      setUser(newUser);
      setAccessToken(data.token)
      localStorage.setItem("seller_user", JSON.stringify(newUser));
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Please fill all fields. Password must be at least 6 characters.",
    };
  };

  const logout = () => {
    setisAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("seller_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, accessToken, login, signup, logout, sellerId,isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
