// src/services/dataService.ts
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

export const dataService = {
    async fetchData<T>(tableName: TableName, options?: {order?: any}) {
        try {
            const {data, error} = await supabase.from(tableName).select("*").order(options?.order || "created_at", { ascending: false });
            if(error) throw error;
            return data as T[];
        } catch (error) {
            console.error(`Error fetching data from ${tableName}:`, error);
            throw error;
        }
    },

     async insertData<T>(tableName: TableName, newData: Partial<T>) {
         try {
             const { data, error } = await supabase
                 .from(tableName)
                 .insert([newData as any]);

             if (error) {
                 throw error;
             }
             return data as T;
         } catch (error: any) {
             console.error(`Error inserting data into ${tableName}`, error);
             throw error;
         }
     },

     async updateData<T>(tableName: TableName, id: string, update: Partial<T>) {
         try {
             const { data, error } = await supabase
                 .from(tableName)
                 .update(update as any)
                 .eq('id', id);

             if (error) {
                 throw error;
             }
             return data as T;
         } catch (error: any) {
             console.error(`Error updating data in ${tableName}`, error);
             throw error;
         }
     },

    async deleteData(tableName: TableName, id: string) {
       try {
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);
           if(error) throw error;
       } catch (error) {
           console.error(`Error deleting data from ${tableName}`, error);
            throw error;
       }
    },
};