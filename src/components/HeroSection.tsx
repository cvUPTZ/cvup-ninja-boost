import { GraduationCap, Users, Award } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen bg-cvup-purple text-white flex flex-col justify-center items-center p-4 md:p-8">
      <div className="animate-fade-in max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-cvup-peach">باينة تلقى خدمة</span> CVUP مع
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          🌟 Empowering Algerian youth to secure their dream jobs through
          professional CV design and interview preparation 📄💼
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <StatCard icon={<Users />} number="2000+" label="CVs Created" />
          <StatCard icon={<Award />} number="96%" label="ATS Success Rate" />
          <StatCard icon={<GraduationCap />} number="10+" label="Training Events" />
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