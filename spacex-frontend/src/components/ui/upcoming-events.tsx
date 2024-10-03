import React from "react";
import UpcomingEventCard from "./upcoming-event-card";
import { upcomingEvents } from "@/lib/dummys/home-dummy-data";
import { PlusIcon } from "lucide-react";

const UpcomingEvents: React.FC = () => {
  return (
    <section>
      <div className="flex bg-red-500 justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-semibold">Upcoming Events</h2>
        <PlusIcon className="h-6 w-6 text-white" />
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {upcomingEvents.map((event) => (
          <UpcomingEventCard
            key={event.id}
            title={event.title}
            date={event.date}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
