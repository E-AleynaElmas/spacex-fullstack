import BaseLayout from "@/components/layouts/base-layout";
import Calendar from "@/components/ui/calendar";
import { recentLaunches } from "@/lib/dummys/home-dummy-data";
import React from "react";

const CalendarPage: React.FC = () => {
  return (
    <BaseLayout>
      <div className="space-y-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Schedule</h2>
        <Calendar events={recentLaunches} />
      </div>
    </BaseLayout>
  );
};

export default CalendarPage;
