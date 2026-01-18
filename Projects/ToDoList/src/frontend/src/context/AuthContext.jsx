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
    const token = localStorage.getItem("authToken");
    if (!!token) { 
        setAccessToken(token); 
        setIsAuthenticated(true); 
    } 
    else {
        refreshAccessToken(); 
    }
    
  }, []);

  const login = async (email, password) => {
    const res = await signIn({ email, password });
    const token = res.data.token;
    if(token == undefined) return;
    localStorage.setItem("authToken", token);
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    //await axios.post("/api/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("authToken");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    try {
      const res = await api.get("/auth/refresh-token", { withCredentials: true });
      const token = res.data.token;
      
      localStorage.setItem("authToken", token);
      setAccessToken(token);
      setIsAuthenticated(true);
      return token;
    } catch {
      logout();
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
