import { BookOpen, Users, Linkedin } from "lucide-react";

export const EventsTimeline = () => {
  const clubs = [
    {
      name: "Civil & Civic ENP",
      activities: "Formations: Rédaction de CV et Entretien",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "Vision Club ENP",
      activities: "Rédaction de CV",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "CAP ENP",
      activities: "Rédaction de CV",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "Innovation Club ESGEN",
      activities: "Rédaction de CV",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "CFC ENSM",
      activities: "Optimisation profil LinkedIn",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: "CFM ENSM",
      activities: "Création de contenu sur LinkedIn",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: "Dotcom HEC",
      activities: "Optimisation profil LinkedIn",
      icon: <Linkedin className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-cvup-purple text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          On a fais confiance à <span className="text-cvup-peach">nous</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {clubs.map((club, index) => (
            <div 
              key={index}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
            >
              <div className="text-cvup-peach mb-4">{club.icon}</div>
              <div className="text-xl font-bold mb-2">{club.name}</div>
              <div className="text-gray-300">{club.activities}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeline;
