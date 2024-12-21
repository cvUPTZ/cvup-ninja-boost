import { BookOpen, BookText, Users, LinkedinIcon, MessageSquare } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      title: "Correction des CV",
      description: "Service professionnel de révision et d'optimisation de CV adapté à votre profil.",
      icon: <BookOpen className="w-8 h-8" />,
      features: [
        "Révision professionnelle",
        "Optimisation ATS",
        "Conseils personnalisés"
      ]
    },
    {
      title: "Préparation Entretien",
      description: "Accompagnement personnalisé pour réussir vos entretiens d'embauche.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Simulation d'entretien",
        "Conseils stratégiques",
        "Feedback détaillé"
      ]
    },
    {
      title: "Optimisation LinkedIn",
      description: "Maximisez votre présence professionnelle sur LinkedIn.",
      icon: <LinkedinIcon className="w-8 h-8" />,
      features: [
        "Optimisation du profil",
        "Stratégie de contenu",
        "Visibilité professionnelle"
      ]
    }
  ];

  const formations = [
    {
      title: "Rédaction de CV",
      description: "Apprenez à créer un CV impactant et professionnel.",
      icon: <BookText className="w-8 h-8" />,
      features: [
        "Techniques de rédaction",
        "Mise en page optimale",
        "Standards ATS"
      ]
    },
    {
      title: "Préparation Entretien",
      description: "Formation complète pour maîtriser l'art de l'entretien.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Techniques de communication",
        "Questions fréquentes",
        "Langage corporel"
      ]
    },
    {
      title: "LinkedIn Pro",
      description: "Développez votre présence professionnelle sur LinkedIn.",
      icon: <LinkedinIcon className="w-8 h-8" />,
      features: [
        "Création de contenu",
        "Stratégie de réseau",
        "Personal branding"
      ]
    },
    {
      title: "Lettre de Motivation",
      description: "Maîtrisez l'art de la lettre de motivation persuasive.",
      icon: <MessageSquare className="w-8 h-8" />,
      features: [
        "Structure efficace",
        "Personnalisation",
        "Impact maximal"
      ]
    }
  ];

  const projects = [
    {
      title: "Skill-up",
      description: "Programme complet de développement des compétences professionnelles.",
      icon: <BookText className="w-8 h-8" />,
      features: [
        "Formation personnalisée",
        "Développement professionnel",
        "Suivi individuel"
      ]
    },
    {
      title: "CV Can",
      description: "Modèles de CV adaptés aux standards canadiens.",
      icon: <BookOpen className="w-8 h-8" />,
      features: [
        "Format canadien",
        "Optimisation locale",
        "Conseils spécifiques"
      ]
    }
  ];

  return (
    <div className="bg-white py-16 space-y-16">
      {/* Services Section */}
      <Section title="Nos Services" items={services} />
      
      {/* Formations Section */}
      <Section title="Nos Formations" items={formations} />
      
      {/* Projects Section */}
      <Section title="Nos Programmes" items={projects} />
    </div>
  );
};

const Section = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
  }> 
}) => (
  <div className="px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-cvup-purple text-center mb-12">
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <ServiceCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            features={item.features}
          />
        ))}
      </div>
    </div>
  </div>
);

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
  <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
    <div className="text-cvup-peach mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-cvup-purple mb-3">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-700 text-sm">
          <span className="w-1.5 h-1.5 bg-cvup-peach rounded-full mr-2" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default ServicesSection;
