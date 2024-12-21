import { StatisticsCards } from "@/components/admin/StatisticsCards";
import { PolicySection } from "@/components/admin/PolicySection";
import { tracking } from "@/services/trackingService";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [analyticsData, setAnalyticsData] = useState(tracking.getCurrentStats());
  const [serviceStats] = useState({
    cvModels: 2000,
    interviews: 125,
    hires: 83,
    atsSuccess: 96,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(tracking.getCurrentStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">
        Tableau de Bord Administrateur
      </h1>
      
      <StatisticsCards
        analyticsData={analyticsData}
        serviceStats={serviceStats}
      />

      <div className="mt-12">
        <PolicySection />
      </div>
    </div>
  );
};

export default AdminPage;