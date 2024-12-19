// Updated Index component
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EventsTimeline } from "@/components/EventsTimeline";
import { AdminLogin } from "@/components/AdminLogin";
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

// Updated Index component
const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, logoutAdmin } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Admin Controls */}
      <div className="fixed top-4 right-4 z-50">
        {isAdmin ? (
          <button
            onClick={logoutAdmin}
            className="bg-cvup-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Admin Logout
          </button>
        ) : (
          <button
            onClick={() => setShowAdminLogin(true)}
            className="bg-cvup-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Admin Login
          </button>
        )}
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && <AdminLogin onClose={() => setShowAdminLogin(false)} />}

      {/* Main Content */}
      <HeroSection />
      <ServicesSection />
      <EventsTimeline />
    </div>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
