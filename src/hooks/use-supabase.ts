// src/hooks/use-supabase.ts
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {  Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

interface SupabaseHookOptions<T> {
    initialData?: T[];
    onSuccess?: (data: T[]) => void;
    onError?: (error: Error) => void;
  }

const useSupabase = <
  TableName extends keyof (Tables<any> & TablesInsert<any> & TablesUpdate<any>),
  T = Tables<TableName>
>(tableName: TableName, options?: SupabaseHookOptions<T>) => {
  const [data, setData] = useState<T[] | null>(options?.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
         .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      setData(data as T[]);
      if (options?.onSuccess) {
          options.onSuccess(data as T[]);
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

    const insertData = async (newData: TablesInsert<TableName>) => {
        setLoading(true);
        setError(null);
    try {
        const { data, error } = await supabase
        .from(tableName)
        .insert([newData]);

        if (error) {
          throw error;
        }
        await fetchData() // Refetch after successful insert
          return data;
    } catch (error: any) {
            setError(error);
           if (options?.onError) {
                options.onError(error);
            }
    } finally {
            setLoading(false);
    }
    };

    const updateData = async (id: string, update: TablesUpdate<TableName>) => {
    setLoading(true);
    setError(null);
    try {
        const { data, error } = await supabase
        .from(tableName)
        .update(update)
        .eq('id', id);
        if (error) {
        throw error;
        }
        await fetchData(); // Refetch after successful update
        return data
    } catch (error: any) {
        setError(error);
       if (options?.onError) {
            options.onError(error);
        }
    } finally {
        setLoading(false);
    }
    };

    const deleteData = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
        const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

        if (error) {
        throw error;
        }
        await fetchData() // Refetch after successful delete
    } catch (error: any) {
         setError(error);
        if (options?.onError) {
            options.onError(error);
        }
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName]);

    return { data, loading, error, fetchData, insertData, updateData, deleteData };
};

export default useSupabase;