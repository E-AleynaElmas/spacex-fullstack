'use client'
import useGetFeed from "@/api/queries/useGetFeed";
import BaseLayout from "@/components/layouts/base-layout";
import Calendar from "@/components/ui/calendar";
import React from "react";

const CalendarPage: React.FC = () => {
  const {data:feedData, isLoading: feedIsLoading} = useGetFeed();
  return (
    <BaseLayout>
      <div className="space-y-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Schedule</h2>
        <Calendar eventsLoading={feedIsLoading} events={feedData} />
      </div>
    </BaseLayout>
  );
};

export default CalendarPage;
