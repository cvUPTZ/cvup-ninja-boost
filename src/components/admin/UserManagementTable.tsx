import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import useSupabase from "@/hooks/use-supabase";
import { User } from "@/types/adminTypes";
import { toast } from "sonner";

const formatDate = (date: string | null) => {
  if (!date) return "Jamais";
  return new Date(date).toLocaleDateString();
};

export const UserManagementTable = () => {
  const { data, loading, error, updateData, deleteData } = useSupabase('users');

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateData(userId, { status: newStatus });
      toast.success(`Statut de l'utilisateur mis à jour avec succès`);
    } catch (error: any) {
      toast.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteData(userId);
        toast.success(`Utilisateur supprimé avec succès`);
      } catch (error: any) {
        toast.error(`Erreur lors de la suppression: ${error.message}`);
      }
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Rôle",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "success" : "destructive"}>
          {row.original.status === "active" ? "Actif" : "Bloqué"}
        </Badge>
      ),
    },
    {
      accessorKey: "last_login",
      header: "Dernière connexion",
      cell: ({ row }) => formatDate(row.original.last_login),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange(user.id, user.status === "active" ? "blocked" : "active")}>
                {user.status === "active" ? "Bloquer" : "Débloquer"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data as User[] || []}
        isLoading={loading}
      />
    </div>
  );
};