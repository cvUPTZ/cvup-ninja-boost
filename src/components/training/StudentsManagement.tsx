// src/components/training/StudentsManagement.tsx
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSupabase from "@/hooks/use-supabase";
import { Apprenant } from "@/types/adminTypes";

const columns: ColumnDef<Apprenant>[] = [
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
        accessorKey: 'created_at',
        header: 'Date d\'inscription'
    }
];

export const StudentsManagement = () => {
    const {data: students, loading} = useSupabase<"apprenants", Apprenant>("apprenants");

  return (
    <Card className="p-6">
      <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-6">Gestion des Apprenants</CardTitle>
      </CardHeader>
      <CardContent>
          <DataTable columns={columns} data={students || []} isLoading={loading}/>
      </CardContent>
    </Card>
  );
};