// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ADMIN_CREDENTIALS } from "../config/authConfig";

interface AuthContextType {
  isAdmin: boolean;
  loginAdmin: (credentials: { email: string; password: string }) => Promise<void>;
  logoutAdmin: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing admin session on mount
  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const loginAdmin = async (credentials: { email: string; password: string }) => {
    try {
      setError(null);

      if (
        credentials.email === ADMIN_CREDENTIALS.email &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        return;
      }
      
      throw new Error('Invalid admin credentials');
    } catch (err) {
      setError('Invalid admin credentials');
      throw err;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ 
      isAdmin, 
      loginAdmin, 
      logoutAdmin, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
