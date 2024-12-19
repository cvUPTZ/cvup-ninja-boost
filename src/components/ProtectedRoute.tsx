// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated or not an admin, redirect to the home page
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
