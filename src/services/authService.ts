// src/services/authService.ts
import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async registerUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  async signInUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
       return data;
    } catch (error) {
      console.error("Error signing in user:", error);
      throw error;
    }
  },

    async signOutUser() {
        try {
           const {error} = await supabase.auth.signOut();
           if (error) {
            throw error;
           }
            // Redirect to login page or wherever appropriate
            console.log('User signed out successfully');
        } catch(error) {
            console.error("Error signing out user:", error);
            throw error;
        }
    },

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  async updateUserRole(userId: string, role: "admin" | "trainer") {
    try {
        const { error } = await supabase
            .from("users") // Replace with your users table
            .update({role: role})
            .eq('id', userId);
            if (error) {
              throw error;
            }
        console.log('User role updated successfully')
    } catch(error) {
        console.error("Error updating user role", error);
         throw error;
    }
  }
};