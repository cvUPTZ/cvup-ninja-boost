import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/adminTypes";
import { Button } from "@/components/ui/button";
import useSupabase from "@/hooks/use-supabase";
import { authService } from "@/services/authService";
import { useToast } from "../ui/use-toast";

interface UserManagementTableProps {
  isLoading: boolean;
}

export const UserManagementTable = ({
  isLoading,
}: UserManagementTableProps) => {
  const { data: users, updateData, loading: updating, error: updateError } = useSupabase<"users">(
    "users",
    {
      onError: (error) => {
          toast({
             title: 'Error',
             description: `An error occured: ${error.message}`,
              variant: 'destructive',
          })
      }
    }
  );
  const { toast } = useToast();

  const handleBlockUser = async (userId: string) => {
    try {
      await updateData(userId, { status: "blocked" });
       toast({
            title: 'Success',
            description: 'User blocked successfully',
        });
    } catch (err: any) {
           toast({
             title: 'Error',
             description: `Failed to block user: ${err.message}`,
              variant: 'destructive',
            })
    }
  };

    const handleUnblockUser = async (userId: string) => {
        try {
           await updateData(userId, { status: "active" });
            toast({
             title: 'Success',
             description: 'User unblocked successfully',
         });
        } catch (err: any) {
            toast({
             title: 'Error',
             description: `Failed to unblock user: ${err.message}`,
              variant: 'destructive',
           })
        }
    }


  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
          {isLoading || updating ? (
              <p>Loading users...</p>
          ) : users && users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastLogin || "Never"}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBlockUser(user.id)}
                          disabled={updating}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleUnblockUser(user.id)}
                          disabled={updating}
                      >
                        Unblock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No users found</p>
        )}
      </CardContent>
    </Card>
  );
};