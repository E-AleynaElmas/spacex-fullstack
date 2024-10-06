// Calendar.tsx
"use client";
import { CalendarAddIcon } from "@/assets/icons/calendar-add-icon";
import BgBase from "@/assets/images/bg-base.png";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { enUS, tr } from "date-fns/locale"; // Import date-fns locales
import { ChevronLeftIcon } from "../../assets/icons/chevron-left-icon";
import { FilterIcon } from "../../assets/icons/filter-icon";
import { MenuIcon } from "../../assets/icons/menu-icon";
import AddFeedModal from "./add-feed-modal";
import EventDetailModal from "./event-detail-modal";

interface Event {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
}

interface CalendarProps {
  events: Event[];
  eventsLoading?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ events, eventsLoading }) => {
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [openAddFeedModal, setOpenAddFeedModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const locale = i18n.language === "tr" ? tr : enUS; // Define locale based on the selected language

  if (eventsLoading) {
    return <div>{t("calendar.loading")}</div>;
  }

  const handleAddEventClick = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd", { locale });
    setSelectedDate(formattedDate);
    setOpenAddFeedModal(true);
  };

  const renderHeader = () => {
    return (
      <div className="flex min-h-16 justify-between items-center mb-4 bg-gray-200 p-2 rounded-lg">
        <div className="flex items-center min-w-60 justify-between ">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-gray-700"
          >
            <ChevronLeftIcon className="text-gray-700" color="#4A5568" />
          </button>
          <h2 className="text-gray-700 text-lg font-semibold mx-2">
            {format(currentMonth, "MMMM yyyy", { locale })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-gray-700"
          >
            <ChevronLeftIcon
              className="text-gray-700 transform rotate-180"
              color="#4A5568"
            />
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <button
            className={` ${
              view === "weekly" ? "text-[#212F42]" : "text-gray-500"
            }`}
            onClick={() => setView("weekly")}
          >
            {t("calendar.weekly")}
          </button>
          <button
            className={` ${
              view === "monthly" ? "text-[#212F42]" : "text-gray-500"
            }`}
            onClick={() => setView("monthly")}
          >
            {t("calendar.monthly")}
          </button>
          <button>
            <MenuIcon color="#212F42" />
          </button>
          <button>
            <FilterIcon color="#212F42" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth), { locale });
    const endDate = endOfWeek(endOfMonth(currentMonth), { locale });

    let day = startDate;
    while (day <= endDate) {
      const currentDay = day;
      const isCurrentMonth =
        format(currentDay, "MM", { locale }) ===
        format(currentMonth, "MM", { locale });

      days.push(
        <div
          style={
            isCurrentMonth ? { backgroundImage: `url(${BgBase.src})` } : {}
          }
          key={currentDay.toString()}
          className={`min-h-32  border border-gray-700 relative ${
            isCurrentMonth ? "" : "bg-[#212F42]"
          }`}
        >
          <div>
            <div className="text-white text-sm">
              {format(currentDay, "d", { locale })}
            </div>
            <CalendarAddIcon
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => handleAddEventClick(currentDay)}
            />
          </div>
          <div className="text-white text-xs absolute bottom-1 left-1 right-1 overflow-y-auto pt-4 max-h-[calc(100%-1rem)] ">
            {events
              .filter(
                (event) =>
                  format(new Date(event.date), "yyyy-MM-dd", { locale }) ===
                  format(currentDay, "yyyy-MM-dd", { locale })
              )
              .map((event, index) => (
                <div
                  key={index}
                  className="bg-[#212F42] rounded p-1 mt-1 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.title}
                </div>
              ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }

    return (
      <div className="grid grid-cols-7 bg-gray-200 gap-1 pt-6 px-1 pb-1 rounded-lg ">
        {days}
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {openAddFeedModal && (
        <AddFeedModal
          open={openAddFeedModal}
          onClose={() => setOpenAddFeedModal(false)}
          initialDate={selectedDate} 
        />
      )}
    </div>
  );
};

export default Calendar;
