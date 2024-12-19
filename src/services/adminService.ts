// src/services/adminService.ts

import axios from 'axios';
import { User, UserStats } from '../types/adminTypes';

// Define your API URL (replace with your actual backend URL)
const API_URL = 'https://preview--cvup-ninja-boost.lovable.app/'; // Replace with your actual API URL

// Fetch user statistics (e.g., total users, active users, blocked users)
export const fetchUserStats = async (): Promise<UserStats> => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data; // Assuming the response contains the stats object
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

// Fetch all users (list of users with their details)
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`);
    return response.data; // Assuming the response contains the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Block a user (example of blocking a user)
export const blockUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/admin/block`, { userId });
    return response.data; // Assuming the response contains the updated user data
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

// Unblock a user
export const unblockUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/admin/unblock`, { userId });
    return response.data; // Assuming the response contains the updated user data
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};