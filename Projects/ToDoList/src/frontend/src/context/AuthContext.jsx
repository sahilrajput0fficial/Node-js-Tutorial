import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "@/assets/api/axios";
import { signIn } from "@/assets/api/auth.api";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Attempt to restore session from cookie on load
    refreshAccessToken();
  }, []);

  const login = async (email, password) => {
    const res = await signIn({ email, password });
    const token = res.data.token; // Even if it's in a cookie, backend might return it for in-memory use
    setAccessToken(token || null);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // Option: notify backend to clear cookie
    // await api.post("/auth/logout");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    try {
      const res = await api.get("/auth/refresh-token");
      const token = res.data.token;

      setAccessToken(token || null);
      setIsAuthenticated(true);
      return token;
    } catch {
      setIsAuthenticated(false);
      setAccessToken(null);
      return null;
    }
  };

  const authAxios = async (options) => {
    try {
      const headers = { ...options.headers, Authorization: `Bearer ${accessToken}` };
      return await axios({ ...options, headers, withCredentials: true });
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) throw err;
        const headers = { ...options.headers, Authorization: `Bearer ${newToken}` };
        return await axios({ ...options, headers, withCredentials: true });
      }
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};
