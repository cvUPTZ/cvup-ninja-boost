import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Award, FileText } from "lucide-react";
import { useTranslation } from 'react-i18next';
import logo from '@/assets/TAKILOGO.jpg';

interface OptimizedIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

const OptimizedIcon = React.memo(({ Icon, className }: OptimizedIconProps) => (
  <Icon className={`w-8 h-8 ${className}`} /> // Reduced from default size to w-8 h-8
));

const StatCard: React.FC<{
  Icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
  analyticsTrackingId?: string;
}> = React.memo(({ Icon, number, label, analyticsTrackingId }) => {
  const handleInteraction = () => {
    if (analyticsTrackingId && typeof window !== 'undefined') {
      // Placeholder for analytics tracking
    }
  };

  return (
    <motion.div 
      className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm overflow-hidden group"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInteraction}
    >
      <div className="relative">
        <OptimizedIcon 
          Icon={Icon} 
          className="text-cvup-peach mb-2 opacity-70 group-hover:opacity-100 transition-opacity mx-auto" 
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-3xl font-bold mb-1 text-white group-hover:text-cvup-peach transition-colors">
            {number}
          </div>
          <div className="text-gray-300 group-hover:text-white transition-colors">
            {label}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export const HeroSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      const heroSection = document.querySelector('#hero-section');
      if (heroSection) observer.observe(heroSection);

      return () => {
        if (heroSection) observer.unobserve(heroSection);
      };
    }
  }, []);

  const stats = useMemo(() => [
    {
      Icon: FileText,
      number: "2000+",
      label: t('hero.cvSent'),
      analyticsTrackingId: 'cv_sent_stat'
    },
    {
      Icon: Users,
      number: "125",
      label: t('hero.interviews'),
      analyticsTrackingId: 'interviews_stat'
    },
    {
      Icon: Award,
      number: "83",
      label: t('hero.hired'),
      analyticsTrackingId: 'hired_stat'
    },
    {
      Icon: GraduationCap,
      number: "10+",
      label: t('hero.trainings'),
      analyticsTrackingId: 'trainings_stat'
    }
  ], [t]);

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen bg-cvup-purple text-white flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden"
      aria-label="CV UP Hero Section"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center w-full z-10"
          >
            <motion.div 
              className="relative w-32 h-32 mx-auto mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img 
                src={logo}  
                alt="Cvup Logo" 
                className="w-full h-full rounded-full shadow-2xl object-cover"
              />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cvup-peach text-center">
              CV_UP
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              <span className="text-cvup-peach">باينة تلقى خدمة</span> CVUP مع
            </h2>
            <p className="text-2xl md:text-3xl font-bold mb-6 text-cvup-peach">
              Keep Hustling
            </p>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto text-center">
              {t('hero.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-br from-cvup-purple to-purple-900 opacity-70 -z-10"></div>
    </section>
  );
};

export default HeroSection;