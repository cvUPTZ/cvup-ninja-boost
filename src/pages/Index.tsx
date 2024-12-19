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
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Admin Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        {isAuthenticated && isAdmin ? (
          <>
            <span className="text-white bg-cvup-purple px-3 py-1 rounded">
              {user?.email}
            </span>
            <button
              onClick={logout}
              className="bg-cvup-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Logout
            </button>
          </>
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
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}

      {/* Main Content */}
      <HeroSection />
      <ServicesSection />
      <EventsTimeline />
    </div>
  );
};

export default Index;
