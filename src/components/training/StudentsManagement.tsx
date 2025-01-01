import React from 'react';
import useSupabase from '@/hooks/use-supabase';
import { DataTable } from '@/components/ui/data-table';
import { studentsColumns } from './columns/studentsColumns';
import { Apprenant } from '@/types/adminTypes';

export const StudentsManagement = () => {
  const { data, loading, error } = useSupabase('apprenants');

  if (error) {
    return <div>Error loading students: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={studentsColumns}
        data={data as Apprenant[] || []}
        isLoading={loading}
      />
    </div>
  );
};