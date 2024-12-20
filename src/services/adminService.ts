import axios from 'axios';
import { User, UserStats } from '../types/adminTypes';

const API_URL = 'https://preview--cvup-ninja-boost.lovable.app/';

export const fetchUserStats = async (): Promise<UserStats> => {
  try {
    const response = await axios.get<UserStats>(`${API_URL}/admin/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/admin/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const blockUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/admin/block`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

export const unblockUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/admin/unblock`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};