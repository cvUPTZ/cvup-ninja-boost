import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  app_metadata: {
    role: string;
  };
  user_metadata: Record<string, any>;
}