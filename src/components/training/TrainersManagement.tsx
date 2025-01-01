import React from 'react';
import useSupabase from '@/hooks/use-supabase';
import { DataTable } from '@/components/ui/data-table';
import { trainersColumns } from './columns/trainersColumns';
import { Trainer } from '@/types/adminTypes';

export const TrainersManagement = () => {
  const { data, loading, error } = useSupabase('formateurs');

  if (error) {
    return <div>Error loading trainers: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={trainersColumns}
        data={data as Trainer[] || []}
        isLoading={loading}
      />
    </div>
  );
};