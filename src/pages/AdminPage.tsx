// src/pages/AdminPage.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Assuming you're using AuthContext for user roles
import { fetchUserStats, fetchAllUsers, blockUser, unblockUser } from "@/services/adminService"; // You can replace these with actual API calls

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "blocked";
}

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth(); // Assuming you're using AuthContext
  const [userStats, setUserStats] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // Fetch statistics
    const loadStats = async () => {
      setLoadingStats(true);
      const stats = await fetchUserStats();
      setUserStats(stats);
      setLoadingStats(false);
    };

    // Fetch all users
    const loadUsers = async () => {
      setLoadingUsers(true);
      const allUsers = await fetchAllUsers();
      setUsers(allUsers);
      setLoadingUsers(false);
    };

    if (isAuthenticated && isAdmin) {
      loadStats();
      loadUsers();
    }
  }, [isAuthenticated, isAdmin]);

  const handleBlockUser = (userId: string) => {
    blockUser(userId).then(() => {
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user.id === userId ? { ...user, status: "blocked" } : user
        )
      );
    });
  };

  const handleUnblockUser = (userId: string) => {
    unblockUser(userId).then(() => {
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user.id === userId ? { ...user, status: "active" } : user
        )
      );
    });
  };

  if (!isAuthenticated || !isAdmin) {
    return <div>You must be an admin to access this page.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Here you can see the statistics and manage users.</p>

      {/* Statistics Section */}
      <div className="stats-section">
        <h2>User Statistics</h2>
        {loadingStats ? (
          <p>Loading statistics...</p>
        ) : (
          <div>
            <p>Total Users: {userStats.totalUsers}</p>
            <p>Total Active Users: {userStats.activeUsers}</p>
            <p>Total Blocked Users: {userStats.blockedUsers}</p>
          </div>
        )}
      </div>

      {/* Users Management Section */}
      <div className="users-management">
        <h2>Manage Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.status === "active" ? (
                      <button onClick={() => handleBlockUser(user.id)}>Block</button>
                    ) : (
                      <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
