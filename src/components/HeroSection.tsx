import { GraduationCap, Users, Award, FileText } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen bg-cvup-purple text-white flex flex-col justify-center items-center p-4 md:p-8">
      <div className="animate-fade-in max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cvup-peach">
          CV_UP
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-cvup-peach">باينة تلقى خدمة</span> CVUP مع
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          🌟 Accompagnement des jeunes algériens vers leur emploi idéal grâce à
          notre expertise en conception de CV et préparation aux entretiens 📄💼
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <StatCard icon={<FileText />} number="2000+" label="CV Envoyés" />
          <StatCard icon={<Users />} number="125" label="Entretiens" />
          <StatCard icon={<Award />} number="83" label="Embauchés" />
          <StatCard icon={<GraduationCap />} number="10+" label="Formations" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) => (
  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm animate-slide-up">
    <div className="text-cvup-peach mb-2">{icon}</div>
    <div className="text-3xl font-bold mb-1">{number}</div>
    <div className="text-gray-300">{label}</div>
  </div>
);