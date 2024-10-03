"use client";
import BgBase from "@/assets/images/bg-base.png";
import { formatDateToTurkish } from "@/lib/utils";
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
import { ChevronLeftIcon } from "../../assets/icons/chevron-left-icon";
import { FilterIcon } from "../../assets/icons/filter-icon";
import { MenuIcon } from "../../assets/icons/menu-icon";
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
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
            {format(currentMonth, "MMMM yyyy")}
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
            Weekly
          </button>
          <button
            className={` ${
              view === "monthly" ? "text-[#212F42]" : "text-gray-500"
            }`}
            onClick={() => setView("monthly")}
          >
            Monthly
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
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    let day = startDate;
    while (day <= endDate) {
      const isCurrentMonth = format(day, "MM") === format(currentMonth, "MM");
      days.push(
        <div
          style={
            isCurrentMonth ? { backgroundImage: `url(${BgBase.src})` } : {}
          }
          key={day.toString()}
          className={`min-h-32  border border-gray-700 relative ${
            isCurrentMonth ? "" : "bg-[#212F42]"
          }`}
        >
          <div className="text-white text-sm">{format(day, "d")}</div>
          <div className="text-white text-xs absolute bottom-1 left-1 right-1 overflow-y-auto pt-4 max-h-[calc(100%-1rem)] ">
            {events
              .filter(
                (event) =>
                  format(new Date(event.date), "yyyy-MM-dd") ===
                  format(day, "yyyy-MM-dd")
              )
              .map((event, index) => (
                <div
                  key={index}
                  className="bg-[#212F42] rounded p-1 mt-1 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  {formatDateToTurkish(event.date).formattedTime}
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
    </div>
  );
};

export default Calendar;
