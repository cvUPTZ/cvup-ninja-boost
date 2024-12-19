import { BookOpen, Languages, Users, Linkedin, FileText, PenTool } from "lucide-react";

export const ServicesSection = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cvup-purple text-center mb-12">
          Nos Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceCard
            title="Nos Services"
            description="Services professionnels pour améliorer votre profil professionnel"
            icon={<BookOpen className="w-8 h-8" />}
            features={[
              "Correction des CV (révision des CV)",
              "Préparation des entretiens",
              "Optimisation profile LinkedIn"
            ]}
          />
          <ServiceCard
            title="Nos Formations"
            description="Programmes de formation complets pour développer vos compétences"
            icon={<Languages className="w-8 h-8" />}
            features={[
              "Rédaction des CV",
              "Préparation entretien",
              "Optimisation profile LinkedIn",
              "Lettre motivation",
              "Création contenue sur LinkedIn"
            ]}
          />
          <ServiceCard
            title="Nos Projets"
            description="Projets innovants pour votre développement professionnel"
            icon={<PenTool className="w-8 h-8" />}
            features={[
              "Skill_It_UP",
              "CV CAN (modèle CV canadien)"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  features 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  features: string[] 
}) => (
  <div className={`bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow ${
    title === "Nos Projets" ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""
  }`}>
    <div className="flex flex-col items-center text-center">
      <div className="text-cvup-peach mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-cvup-purple mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <span className="w-1.5 h-1.5 bg-cvup-peach rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ServicesSection;
