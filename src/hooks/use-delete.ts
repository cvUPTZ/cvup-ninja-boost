// src/hooks/use-delete.ts
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { dataService } from "@/services/dataService";
import { Database } from "@/integrations/supabase/types";
type Tables = Database['public']['Tables'];
type TableName = keyof Tables;


const useDelete = (tableName: TableName, {onSuccess, onError}: {
    onSuccess?: () => void,
    onError?: (err: any) => void
} = {}) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const deleteData = async (id: string) => {
        setLoading(true);
        try {
            await dataService.deleteData(tableName, id);
            if (onSuccess) onSuccess();
            toast({
                title: 'Success',
                description: 'Item deleted successfully',
            });
        } catch (error: any) {
             if(onError) onError(error);
             toast({
                title: 'Error',
                description: `Failed to delete item: ${error.message}`,
                variant: 'destructive',
            })
        } finally {
            setLoading(false);
        }
    };

    return { deleteData, loading };
};

export default useDelete;