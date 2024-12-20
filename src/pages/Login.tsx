import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AdminLogin } from "@/components/AdminLogin";

const Login: React.FC = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => setShowAdminLogin(true)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cvup-purple hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cvup-purple"
          >
            Sign in as Admin
          </button>
        </div>

        {showAdminLogin && (
          <AdminLogin onClose={() => setShowAdminLogin(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;