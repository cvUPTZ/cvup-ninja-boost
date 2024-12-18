import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Award, FileText } from "lucide-react";

// Lazy-loaded internationalization
const { useTranslation } = dynamic(() => import('next-i18next'), { ssr: false });

// Performance-optimized icon component
const OptimizedIcon = React.memo(({ Icon, className }) => (
  <Icon className={`w-full h-full ${className}`} />
));

// Advanced stat card with interaction and analytics
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
  analyticsTrackingId?: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ 
  icon: Icon, 
  number, 
  label, 
  analyticsTrackingId 
}) => {
  const handleInteraction = () => {
    // Potential analytics tracking
    if (analyticsTrackingId) {
      // Placeholder for analytics tracking
      // window.analytics.track(analyticsTrackingId);
    }
  };

  return (
    <motion.div 
      className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm overflow-hidden group"
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInteraction}
    >
      <div className="relative">
        <OptimizedIcon 
          Icon={Icon} 
          className="text-cvup-peach mb-2 opacity-70 group-hover:opacity-100 transition-opacity" 
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
    const img = new Image();
    img.src = "/TAKI LOGO.jpg";
    
    // Intersection Observer for lazy loading
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

    return () => observer.disconnect();
  }, []);

  // Memoized stats to prevent unnecessary re-renders
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
            <motion.img 
              src="/TAKI LOGO.jpg" 
              alt="CVUP Logo" 
              width={128}
              height={128}
              className="w-32 h-32 mx-auto mb-6 rounded-full shadow-2xl object-cover"
              loading="lazy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cvup-peach">
              CV_UP
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-cvup-peach">باينة تلقى خدمة</span> CVUP مع
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
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
