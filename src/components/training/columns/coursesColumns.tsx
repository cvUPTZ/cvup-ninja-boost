import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  created_at: string;
};

export const columns: ColumnDef<Course>[] = [
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

      return (
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];