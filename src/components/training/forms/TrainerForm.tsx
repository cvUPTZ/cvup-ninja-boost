import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type TrainerFormData = {
  full_name: string;
  email: string;
  phone: string;
  speciality: string;
};

interface TrainerFormProps {
  onClose: () => void;
}

export const TrainerForm = ({ onClose }: TrainerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<TrainerFormData>({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      speciality: "",
    },
  });

  const onSubmit = async (data: TrainerFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("formateurs").insert([data]);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      onClose();
    } catch (error) {
      console.error("Error creating trainer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-semibold mb-4">Ajouter un Formateur</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nom du formateur" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Numéro de téléphone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialité</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Spécialité" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Création..." : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};