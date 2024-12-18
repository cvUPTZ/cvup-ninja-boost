import React from 'react';
import { GraduationCap, Users, Award, FileText } from "lucide-react";

// Interface for StatCard props for better type safety
interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

// Extracted StatCard component with improved typing
const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm animate-slide-up transition-all duration-300 hover:scale-105">
    <div className="text-cvup-peach mb-2 w-10 h-10">{icon}</div>
    <div className="text-3xl font-bold mb-1">{number}</div>
    <div className="text-gray-300">{label}</div>
  </div>
);

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-cvup-purple text-white flex flex-col justify-center items-center p-4 md:p-8">
      <div className="animate-fade-in max-w-4xl text-center w-full">
        <img 
          src="/TAKI LOGO.jpg" 
          alt="CVUP Logo" 
          className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg"
          width={128}
          height={128}
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cvup-peach">
          CV_UP
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-cvup-peach">باينة تلقى خدمة</span> CVUP مع
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          🌟 Accompagnement des jeunes algériens vers leur emploi idéal grâce à
          notre expertise en conception de CV et préparation aux entretiens 📄💼
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
          <StatCard 
            icon={<FileText className="w-full h-full" />} 
            number="2000+" 
            label="CV Envoyés" 
          />
          <StatCard 
            icon={<Users className="w-full h-full" />} 
            number="125" 
            label="Entretiens" 
          />
          <StatCard 
            icon={<Award className="w-full h-full" />} 
            number="83" 
            label="Embauchés" 
          />
          <StatCard 
            icon={<GraduationCap className="w-full h-full" />} 
            number="10+" 
            label="Formations" 
          />
        </div>
      </div>
    </section>
  );
};