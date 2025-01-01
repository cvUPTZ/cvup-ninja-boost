// src/components/training/columns/trainersColumns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Trainer } from '@/types/adminTypes';
import useSupabase from "@/hooks/use-supabase";
import { useToast } from "@/components/ui/use-toast";


export const trainersColumns: ColumnDef<Trainer>[] = [
  {
    accessorKey: "full_name",
    header: "Nom complet",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "speciality",
    header: "Spécialité",
  },
    {
        id: "actions",
        cell: ({ row }) => {
            const trainer = row.original;
           const {deleteData, loading} = useSupabase<"formateurs">("formateurs", {
               onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Trainer deleted successfully',
                    });
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to delete trainer: ${error.message}`,
                        variant: 'destructive',
                    })
                }
            });
             const { toast } = useToast();
            const handleDelete = async () => {
                await deleteData(trainer.id);
            };

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" disabled={loading}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={handleDelete} disabled={loading}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];