// src/components/training/CoursesManagement.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import {  coursesColumns } from "./columns/coursesColumns";
import { Course } from "@/types/adminTypes";
import { CourseForm } from "./forms/CourseForm";
import useSupabase from "@/hooks/use-supabase";


export const CoursesManagement = () => {
  const [showForm, setShowForm] = useState(false);
    const { data: courses, isLoading } = useSupabase<"formations", Course>("formations");


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Liste des Formations</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une Formation
        </Button>
      </div>

        <DataTable columns={coursesColumns} data={courses || []} isLoading={isLoading}/>

      {showForm && <CourseForm onClose={() => setShowForm(false)} />}
    </div>
  );
};