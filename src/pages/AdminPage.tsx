import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserStats, fetchAllUsers, blockUser, unblockUser } from "@/services/adminService";
import { User, UserStats } from "@/types/adminTypes";

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoadingStats(true);
      try {
        const stats = await fetchUserStats();
        setUserStats(stats);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const allUsers = await fetchAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      loadStats();
      loadUsers();
    }
  }, [isAuthenticated, isAdmin]);

  const handleBlockUser = async (userId: string) => {
    try {
      const updatedUser = await blockUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, status: 'blocked' as const } : user
        )
      );
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      const updatedUser = await unblockUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, status: 'active' as const } : user
        )
      );
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <div>You must be an admin to access this page.</div>;
  }

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-8">Here you can see the statistics and manage users.</p>

      {/* Statistics Section */}
      <div className="stats-section bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
        {loadingStats ? (
          <p>Loading statistics...</p>
        ) : userStats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-medium">Total Users: {userStats.totalUsers}</p>
            </div>
            <div className="stat-card p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-medium">Active Users: {userStats.activeUsers}</p>
            </div>
            <div className="stat-card p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-medium">Blocked Users: {userStats.blockedUsers}</p>
            </div>
          </div>
        ) : (
          <p>No statistics available</p>
        )}
      </div>

      {/* Users Management Section */}
      <div className="users-management bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;