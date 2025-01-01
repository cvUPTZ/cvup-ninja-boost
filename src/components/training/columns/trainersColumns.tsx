import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export type Trainer = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  speciality: string | null;
  created_at: string;
};

export const columns: ColumnDef<Trainer>[] = [
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