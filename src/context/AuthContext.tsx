// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authService } from "@/services/authService";
import { User } from "@/integrations/supabase/types";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTrainer: boolean;
  trainerId: string | null;
    user: User | null;
  login: (role: string, id?: string) => void;
  logout: () => void;
  loginAdmin: (credentials: { email: string; password: string }) => Promise<void>;
  loginTrainer: (credentials: { email: string; password: string }) => Promise<void>;
  error: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true)
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                     if (currentUser.app_metadata.role === 'admin') {
                      login('admin', currentUser.id)
                    }
                      if (currentUser.app_metadata.role === 'trainer') {
                        login('trainer', currentUser.id)
                    }

                    setIsAuthenticated(true);
                    setLoading(false)
                } else {
                   setLoading(false)
                    setIsAuthenticated(false);
                    setUser(null);
                    setUserRole(null);
                    setTrainerId(null)

                }
            } catch (err) {
                setLoading(false)
                console.error('Error checking auth state', err);
                setUser(null);
                setUserRole(null);
                setTrainerId(null)
                setIsAuthenticated(false);
            }
        }
         fetchCurrentUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  const login = (role: string, id?: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
      if (role === 'trainer' && id) {
         setTrainerId(id);
      }
  };

  const logout = async () => {
      try {
          setLoading(true)
          await authService.signOutUser();
          setIsAuthenticated(false);
          setUser(null);
          setUserRole(null);
          setTrainerId(null)
           setLoading(false);
      } catch (err) {
            console.error('Error signing out:', err);
            setLoading(false)
            setError(err instanceof Error ? err.message : "An error occurred");
            throw err;
      }
  };

    const loginAdmin = async (credentials: { email: string; password: string }) => {
        try {
          setLoading(true);
          const user = await authService.signInUser(credentials.email, credentials.password);
            if (user?.user?.app_metadata?.role === 'admin') {
                login("admin", user?.user?.id);
                setError(null);
                setLoading(false)
            } else {
                setLoading(false)
                throw new Error("Invalid admin credentials");
            }
        } catch (err) {
            setLoading(false)
          setError(err instanceof Error ? err.message : "An error occurred");
          throw err;
        }
      };

    const loginTrainer = async (credentials: { email: string; password: string }) => {
        try {
            setLoading(true);
            const user = await authService.signInUser(credentials.email, credentials.password);
          if (user?.user?.app_metadata?.role === 'trainer') {
                login("trainer", user?.user?.id);
              setError(null);
              setLoading(false)
            } else {
                setLoading(false);
              throw new Error("Invalid trainer credentials");
          }
        } catch (err) {
          setLoading(false)
          setError(err instanceof Error ? err.message : "An error occurred");
          throw err;
        }
      };

  const isAdmin = isAuthenticated && userRole === "admin";
  const isTrainer = isAuthenticated && userRole === "trainer";

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      isTrainer,
      trainerId,
      login,
      logout,
      loginAdmin,
      loginTrainer,
      error,
      user,
        loading,
    }}>
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