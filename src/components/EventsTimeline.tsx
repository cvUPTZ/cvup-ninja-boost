import { Calendar, Users } from "lucide-react";

export const EventsTimeline = () => {
  const events = [
    { type: "Google Meet", count: 3, icon: <Calendar className="w-5 h-5" /> },
    { type: "Scientific Club Events", count: 6, icon: <Users className="w-5 h-5" /> },
    { type: "AIESEC Collaboration", count: 1, icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-cvup-purple text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our <span className="text-cvup-peach">Impact</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-center"
            >
              <div className="text-cvup-peach mb-4">{event.icon}</div>
              <div className="text-4xl font-bold mb-2">{event.count}</div>
              <div className="text-gray-300">{event.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};