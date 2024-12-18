import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EventsTimeline } from "@/components/EventsTimeline";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <EventsTimeline />
    </div>
  );
};

export default Index;