
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TableName, TablesRow, TablesInsert, TablesUpdate, isValidTableName } from "@/types/supabase/database.types";

interface SupabaseHookOptions<T> {
  initialData?: T[];
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
}

const useSupabase = <TN extends TableName>(
  tableName: TN,
  options?: SupabaseHookOptions<TablesRow<TN>>
) => {
  const [data, setData] = useState<TablesRow<TN>[] | null>(options?.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!isValidTableName(tableName)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }
    
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .select("*")
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedResult = result as unknown as TablesRow<TN>[];
      setData(typedResult);
      
      if (options?.onSuccess) {
        options.onSuccess(typedResult);
      }
    } catch (error: any) {
      setError(error);
      if (options?.onError) {
        options.onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const insertData = async (newData: TablesInsert<TN>) => {
    if (!isValidTableName(tableName)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }
    
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([newData as any])
        .select();

      if (error) throw error;
      
      await fetchData();
      return result as unknown as TablesRow<TN>[];
    } catch (error: any) {
      setError(error);
      if (options?.onError) {
        options.onError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id: string, update: TablesUpdate<TN>) => {
    if (!isValidTableName(tableName)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }
    
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(update as any)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      await fetchData();
      return result as unknown as TablesRow<TN>[];
    } catch (error: any) {
      setError(error);
      if (options?.onError) {
        options.onError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    if (!isValidTableName(tableName)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }
    
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchData();
    } catch (error: any) {
      setError(error);
      if (options?.onError) {
        options.onError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName]);

  return {
    data,
    loading,
    error,
    fetchData,
    insertData,
    updateData,
    deleteData,
  };
};

export default useSupabase;
