"use client";
import useGetFeedEvents from "@/api/queries/useGetFeedEvents";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import AddEventModal from "./add-event-modal";
import CircleSpinner from "./circle-spinner";
import UpcomingEventCard from "./upcoming-event-card";
import { useTranslation } from "react-i18next";

interface UpcomingEventsProps {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

const UpcomingEvents: React.FC = () => {
  const { data: feedEventsData, isLoading: feedEventsIsLoading } =
    useGetFeedEvents();
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-semibold">{t("home.upcoming_events")}</h2>
        <PlusIcon
          className="h-6 w-6 text-white"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {feedEventsIsLoading ? (
          <div className="flex justify-center w-full  items-center">
            <CircleSpinner className="w-10 h-10" />
          </div>
        ) : (
          feedEventsData.map((event: UpcomingEventsProps) => (
            <UpcomingEventCard
            id={event.id}
              key={event.id}
              title={event.title}
              date={event.date}
              imageUrl={event.imageUrl}
            />
          ))
        )}
      </div>
      {openModal && (
        <AddEventModal open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default UpcomingEvents;
