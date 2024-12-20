import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserStats, fetchAllUsers, blockUser, unblockUser } from "@/services/adminService";
import { User, UserStats } from "@/types/adminTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Initialize as empty array
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
        const response = await fetchAllUsers();
        // Ensure response is an array before setting state
        if (Array.isArray(response)) {
          setUsers(response);
        } else {
          console.error('Expected array of users but got:', response);
          setUsers([]); // Set empty array as fallback
        }
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]); // Set empty array on error
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
      await blockUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, status: 'blocked' } : user
        )
      );
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, status: 'active' } : user
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
        ) : users && users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;