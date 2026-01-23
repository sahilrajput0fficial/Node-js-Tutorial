import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  storeName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, storeName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: '1',
  email: 'demo@seller.com',
  name: 'John Seller',
  storeName: 'My Awesome Store',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('seller_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Demo credentials check
    if (email && password.length >= 6) {
      const loggedInUser = { ...DEMO_USER, email };
      setUser(loggedInUser);
      localStorage.setItem('seller_user', JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Password must be at least 6 characters.' };
  };

  const signup = async (email: string, password: string, name: string, storeName: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password.length >= 6 && name && storeName) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        storeName,
      };
      setUser(newUser);
      localStorage.setItem('seller_user', JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields. Password must be at least 6 characters.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('seller_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
