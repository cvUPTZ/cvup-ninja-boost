// src/components/training/TrainersManagement.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { trainersColumns } from "./columns/trainersColumns";
import { Trainer } from "@/types/adminTypes";
import { TrainerForm } from "./forms/TrainerForm";
import useSupabase from "@/hooks/use-supabase";


export const TrainersManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: trainers, isLoading } = useSupabase<"formateurs", Trainer>("formateurs");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Liste des Formateurs</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Formateur
        </Button>
      </div>

        <DataTable columns={trainersColumns} data={trainers || []} isLoading={isLoading}/>


      {showForm && <TrainerForm onClose={() => setShowForm(false)} />}
    </div>
  );
};