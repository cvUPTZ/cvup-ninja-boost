import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CoursesManagement } from "@/components/training/CoursesManagement";
import { TrainersManagement } from "@/components/training/TrainersManagement";
import { StudentsManagement } from "@/components/training/StudentsManagement";
import { SessionsManagement } from "@/components/training/SessionsManagement";

const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">
        Gestion des Formations
      </h1>

      <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Formations</TabsTrigger>
          <TabsTrigger value="trainers">Formateurs</TabsTrigger>
          <TabsTrigger value="students">Apprenants</TabsTrigger>
          <TabsTrigger value="sessions">Séances</TabsTrigger>
        </TabsList>

        <Card className="mt-6">
          <TabsContent value="courses">
            <CoursesManagement />
          </TabsContent>
          <TabsContent value="trainers">
            <TrainersManagement />
          </TabsContent>
          <TabsContent value="students">
            <StudentsManagement />
          </TabsContent>
          <TabsContent value="sessions">
            <SessionsManagement />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default TrainingManagement;