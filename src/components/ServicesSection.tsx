import { BookOpen, Languages, Users } from "lucide-react";

export const ServicesSection = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cvup-purple text-center mb-12">
          Nos Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceCard
            title="CV_UP"
            description="Service professionnel de conception de CV avec un taux de réussite ATS élevé. Adapté aux profils juniors et seniors."
            icon={<BookOpen className="w-8 h-8" />}
            features={[
              "Modèles optimisés ATS",
              "Révision professionnelle",
              "Préparation aux entretiens"
            ]}
          />
          <ServiceCard
            title="Skillit_UP"
            description="Programmes de formation complets pour améliorer vos compétences professionnelles."
            icon={<Languages className="w-8 h-8" />}
            features={[
              "Cours de langues (FR/EN)",
              "Formation soft skills",
              "Maîtrise d'Excel"
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
  <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
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
);