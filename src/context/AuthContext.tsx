import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (role: string) => void;
  logout: () => void;
  loginAdmin: (credentials: { email: string; password: string }) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const loginAdmin = async (credentials: { email: string; password: string }) => {
    try {
      // Here you would typically make an API call to validate credentials
      if (credentials.email === "admin@cvup.com" && credentials.password === "admin") {
        login("admin");
        setError(null);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const isAdmin = isAuthenticated && userRole === "admin";

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, loginAdmin, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};