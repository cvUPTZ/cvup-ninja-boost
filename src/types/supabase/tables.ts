import { Database } from "@/integrations/supabase/types";

export type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;

export type TablesRow<T extends TableName> = Tables[T]['Row'];
export type TablesInsert<T extends TableName> = Tables[T]['Insert'];
export type TablesUpdate<T extends TableName> = Tables[T]['Update'];