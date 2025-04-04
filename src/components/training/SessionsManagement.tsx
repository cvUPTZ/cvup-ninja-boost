
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Session = {
  id: string;
  date_debut: string;
  date_fin: string;
  formation_id: string;
  formateur_id: string;
  status: string;
  formation?: {
    title: string;
  };
  formateur?: {
    full_name: string;
  };
};

export const SessionsManagement = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const { toast } = useToast();

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data: sessionsData, error } = await supabase
        .from("seances_formation")
        .select(`
          *,
          formation:formation_id (title),
          formateur:formateur_id (full_name)
        `)
        .order("date_debut", { ascending: false });

      if (error) throw error;
      setSessions(sessionsData || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load sessions data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesAndTrainers = async () => {
    try {
      const [coursesResult, trainersResult] = await Promise.all([
        supabase.from("formations").select("id, title"),
        supabase.from("formateurs").select("id, full_name")
      ]);
      
      if (coursesResult.error) throw coursesResult.error;
      if (trainersResult.error) throw trainersResult.error;
      
      setCourses(coursesResult.data || []);
      setTrainers(trainersResult.data || []);
    } catch (error) {
      console.error("Error fetching reference data:", error);
      toast({
        title: "Error",
        description: "Failed to load reference data",
        variant: "destructive",
      });
    }
  };

  const createSession = async () => {
    if (!startDate || !endDate || !selectedCourse || !selectedTrainer) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("seances_formation")
        .insert([{
          date_debut: startDate.toISOString(),
          date_fin: endDate.toISOString(),
          formation_id: selectedCourse,
          formateur_id: selectedTrainer,
          status: "planifié"
        }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Session Created",
        description: "The training session has been scheduled successfully",
      });
      
      fetchSessions();
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: "Failed to create the training session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchCoursesAndTrainers();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planifié":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Planifié</Badge>;
      case "en cours":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">En cours</Badge>;
      case "terminé":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Terminé</Badge>;
      case "annulé":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-md bg-white border border-gray-100">
      <CardHeader className="bg-cvup-purple text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold flex items-center justify-between">
          <span>Gestion des Séances</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white text-cvup-purple hover:bg-gray-100">
                <PlusCircle className="h-4 w-4 mr-2" /> Ajouter une séance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Planifier une nouvelle séance</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="formation" className="col-span-4">
                    Formation
                  </Label>
                  <select 
                    id="formation"
                    className="col-span-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Sélectionner une formation</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trainer" className="col-span-4">
                    Formateur
                  </Label>
                  <select 
                    id="trainer"
                    className="col-span-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTrainer}
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                  >
                    <option value="">Sélectionner un formateur</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="col-span-4">
                    Date de début
                  </Label>
                  <div className="col-span-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Sélectionner une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="col-span-4">
                    Date de fin
                  </Label>
                  <div className="col-span-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Sélectionner une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <Button onClick={createSession} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Créer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription className="text-gray-200">
          Planifiez et gérez les séances de formation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-cvup-purple" />
          </div>
        )}
        
        {!loading && sessions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune séance planifiée</p>
            <p className="mt-2 text-sm">Utilisez le bouton "Ajouter une séance" pour créer une nouvelle séance</p>
          </div>
        )}
        
        {!loading && sessions.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Formateur</TableHead>
                  <TableHead>Début</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{session.formation?.title || 'N/A'}</TableCell>
                    <TableCell>{session.formateur?.full_name || 'N/A'}</TableCell>
                    <TableCell>{new Date(session.date_debut).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(session.date_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(session.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
