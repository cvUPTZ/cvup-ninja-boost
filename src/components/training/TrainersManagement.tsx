import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns/trainersColumns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrainerForm } from "./forms/TrainerForm";

export const TrainersManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formateurs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Liste des Formateurs</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Formateur
        </Button>
      </div>

      <DataTable columns={columns} data={trainers || []} />

      {showForm && <TrainerForm onClose={() => setShowForm(false)} />}
    </div>
  );
};