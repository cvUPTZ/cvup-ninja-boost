import { ColumnDef } from "@tanstack/react-table";
import { Apprenant } from "@/types/adminTypes";

export const studentsColumns: ColumnDef<Apprenant>[] = [
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
    cell: ({ row }) => row.original.phone || "Non renseigné",
  },
  {
    accessorKey: "created_at",
    header: "Date d'inscription",
    cell: ({ row }) => new Date(row.original.created_at || "").toLocaleDateString(),
  },
];