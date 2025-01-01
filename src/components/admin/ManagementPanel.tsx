import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Users, Settings, FileText } from "lucide-react";
import useSupabase from "@/hooks/use-supabase";

export const ManagementPanel = () => {
  const { toast } = useToast();
  const [newUser, setNewUser] = useState({ email: "", role: "user" });
    const { insertData, loading } = useSupabase<"users">("users", {
        onSuccess: () => {
          toast({
            title: "Utilisateur ajouté",
            description: `${newUser.email} a été ajouté avec succès.`,
          });
           setNewUser({ email: "", role: "user" });
        },
        onError: (error) => {
            toast({
                title: "Erreur",
                description: `Une erreur s'est produite lors de l'ajout de l'utilisateur: ${error.message}`,
                variant: 'destructive',
            })
        }
    });

  const [contentId, setContentId] = useState("");

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertData({ email: newUser.email, role: newUser.role, name: newUser.email, status: 'active' });
  };

  const handleContentUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement content update logic here
    toast({
      title: "Contenu mis à jour",
      description: "Le contenu a été mis à jour avec succès.",
    });
    setContentId("");
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#1A1F2C]">
          Panneau de Gestion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contenu
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="utilisateur@example.com"
                />
              </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Adding..." : "Ajouter un utilisateur"}
                </Button>
            </form>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <form onSubmit={handleContentUpdate} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contentId">ID du contenu</Label>
                <Input
                  id="contentId"
                  value={contentId}
                  onChange={(e) => setContentId(e.target.value)}
                  placeholder="ID du contenu à mettre à jour"
                />
              </div>
              <Button type="submit" className="w-full">
                Mettre à jour le contenu
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Paramètres système</h3>
              <p className="text-sm text-gray-500">
                Les paramètres système seront bientôt disponibles.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};