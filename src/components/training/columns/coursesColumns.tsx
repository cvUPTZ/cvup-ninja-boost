import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Course } from '@/types/adminTypes';
import useSupabase from "@/hooks/use-supabase";
import { useToast } from "@/components/ui/use-toast";

export const coursesColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "duration",
    header: "Durée (heures)",
  },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original;
            const {deleteData, loading} = useSupabase<"formations">("formations",{
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Course deleted successfully',
                    });
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: `Failed to delete course: ${error.message}`,
                        variant: 'destructive',
                    })
                }
            });
             const { toast } = useToast();
             const handleDelete = async () => {
                await deleteData(course.id);
            };


            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" disabled={loading}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={handleDelete}  disabled={loading}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];