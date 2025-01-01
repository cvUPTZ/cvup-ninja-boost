// src/components/training/columns/coursesColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Course } from '@/types/adminTypes';
import useDelete from "@/hooks/use-delete";

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
           const {deleteData, loading} = useDelete("formations");


            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" disabled={loading}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteData(course.id)}  disabled={loading}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];