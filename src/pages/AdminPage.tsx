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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileCheck, UserCheck, BarChart3 } from "lucide-react";

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [users, setUsers] = useState<User[]>([]); 
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Landing page statistics
  const landingPageStats = [
    { name: 'CV Models', value: 2000 },
    { name: 'Interviews', value: 125 },
    { name: 'Hires', value: 83 },
    { name: 'ATS Success', value: 96 },
  ];

  const eventStats = [
    { name: 'Google Meet', value: 3 },
    { name: 'Scientific Club', value: 6 },
    { name: 'AIESEC Collab', value: 1 },
  ];

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
        if (Array.isArray(response)) {
          setUsers(response);
        } else {
          console.error('Expected array of users but got:', response);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
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
    return <div className="p-6">You must be an admin to access this page.</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">Admin Dashboard</h1>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {landingPageStats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              {index === 0 && <FileCheck className="h-4 w-4 text-cvup-peach" />}
              {index === 1 && <Users className="h-4 w-4 text-cvup-peach" />}
              {index === 2 && <UserCheck className="h-4 w-4 text-cvup-peach" />}
              {index === 3 && <BarChart3 className="h-4 w-4 text-cvup-peach" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}{index === 3 && '%'}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Events Chart */}
      <Card className="bg-white shadow-md p-6 mb-8">
        <CardHeader>
          <CardTitle>Event Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ffbd59" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Management Section */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="text-green-600 hover:text-green-900 font-medium"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;