// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isAdmin, isTrainer } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check route access based on role
  if (location.pathname === "/admin" && !isAdmin) {
     return  <Navigate to="/" replace />;
  }


    if (location.pathname.startsWith("/training")) {
         if (isAdmin) return <>{children}</>

       if (isTrainer) {
          const allowedPaths = ["/training", "/training/sessions", "/training/students"];

          const isAllowed = allowedPaths.some(path => location.pathname.startsWith(path));
          if (isAllowed) {
            return <>{children}</>
           }
       }
        return  <Navigate to="/" replace />;

    }


  return <>{children}</>;
};

export default ProtectedRoute;