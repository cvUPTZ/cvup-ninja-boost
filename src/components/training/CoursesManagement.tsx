import React from 'react';
import useSupabase from '@/hooks/use-supabase';
import { DataTable } from '@/components/ui/data-table';
import { coursesColumns } from './columns/coursesColumns';
import { Course } from '@/types/adminTypes';

export const CoursesManagement = () => {
  const { data, loading, error } = useSupabase('formations');

  if (error) {
    return <div>Error loading courses: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={coursesColumns}
        data={data as Course[] || []}
        isLoading={loading}
      />
    </div>
  );
};