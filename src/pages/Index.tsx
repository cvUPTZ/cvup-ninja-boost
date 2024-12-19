import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EventsTimeline } from "@/components/EventsTimeline";
import { AdminLogin } from "@/components/AdminLogin";
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Admin Controls */}
      <div className="fixed top-4 right-4 z-50">
        {isAdmin ? (
          <button
            onClick={logout}
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

export default Index;