// src/types/adminTypes.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';  // Making this a union type instead of string
  status: 'active' | 'blocked';
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
}