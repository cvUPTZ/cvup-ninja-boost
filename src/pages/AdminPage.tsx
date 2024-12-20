import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  fetchUserStats,
  fetchAllUsers,
  blockUser,
  unblockUser,
  fetchAnalytics,
} from "@/services/adminService";
import { User, UserStats, AnalyticsData } from "@/types/adminTypes";
import { StatisticsCards } from "@/components/admin/StatisticsCards";
import { EventsChart } from "@/components/admin/EventsChart";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { useToast } from "@/components/ui/use-toast";

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const serviceStats = {
    cvModels: 2000,
    interviews: 125,
    hires: 83,
    atsSuccess: 96,
  };

  const eventStats = [
    { name: "Google Meet", value: 3 },
    { name: "Scientific Club", value: 6 },
    { name: "AIESEC Collab", value: 1 },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && isAdmin) {
        try {
          setLoadingStats(true);
          setLoadingUsers(true);

          const [stats, users, analytics] = await Promise.all([
            fetchUserStats(),
            fetchAllUsers(),
            fetchAnalytics(),
          ]);

          setUserStats(stats);
          setUsers(users);
          setAnalyticsData(analytics);

          toast({
            title: "Data loaded successfully",
            description: "Admin dashboard has been updated with the latest data.",
          });
        } catch (error) {
          console.error("Error loading admin data:", error);
          toast({
            title: "Error loading data",
            description: "There was a problem loading the admin dashboard data.",
            variant: "destructive",
          });
        } finally {
          setLoadingStats(false);
          setLoadingUsers(false);
        }
      }
    };

    loadData();
  }, [isAuthenticated, isAdmin, toast]);

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "blocked" } : user
        )
      );
      toast({
        title: "User blocked",
        description: "The user has been blocked successfully.",
      });
    } catch (error) {
      console.error("Error blocking user:", error);
      toast({
        title: "Error blocking user",
        description: "There was a problem blocking the user.",
        variant: "destructive",
      });
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "active" } : user
        )
      );
      toast({
        title: "User unblocked",
        description: "The user has been unblocked successfully.",
      });
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast({
        title: "Error unblocking user",
        description: "There was a problem unblocking the user.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <div className="p-6">You must be an admin to access this page.</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">Admin Dashboard</h1>

      {analyticsData && (
        <StatisticsCards
          analyticsData={analyticsData}
          serviceStats={serviceStats}
        />
      )}

{/*       <EventsChart eventStats={eventStats} /> */}

      <UserManagementTable
        users={users}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        isLoading={loadingUsers}
      />
    </div>
  );
};

export default AdminPage;
