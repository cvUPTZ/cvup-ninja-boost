import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
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
      accessorKey: "created_at",
      header: "Date d'inscription",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    }
];

const AdminStats = () => {
    const { data: students, loading } = useSupabase('apprenants');

    return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">
        Student Registration Statistics
      </h1>
        <Card className="p-6">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold mb-6">
                    Registration Process Stats
                </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={students || []} isLoading={loading}/>
          </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;