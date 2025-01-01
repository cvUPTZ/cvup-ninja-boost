import { Database } from "@/integrations/supabase/types";

export type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;

export type TablesRow<T extends TableName> = Tables[T]['Row'];
export type TablesInsert<T extends TableName> = Tables[T]['Insert'];
export type TablesUpdate<T extends TableName> = Tables[T]['Update'];

// Type guards for table names
export const isValidTableName = (name: string): name is TableName => {
  return [
    'aggregated_metrics',
    'apprenants',
    'formateurs',
    'formations',
    'inscriptions_formation',
    'page_views',
    'seances_formation',
    'user_interactions',
    'users'
  ].includes(name);
};