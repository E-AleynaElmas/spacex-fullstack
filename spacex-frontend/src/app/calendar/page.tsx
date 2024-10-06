'use client'
import useGetFeed from "@/api/queries/useGetFeed";
import BaseLayout from "@/components/layouts/base-layout";
import Calendar from "@/components/ui/calendar";
import React from "react";
import { useTranslation } from "react-i18next";

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const {data:feedData, isLoading: feedIsLoading} = useGetFeed();
  return (
    <BaseLayout>
      <div className="space-y-8">
        <h2 className="text-white text-2xl font-semibold mb-4">{t("calendar.title")}</h2>
        <Calendar eventsLoading={feedIsLoading} events={feedData} />
      </div>
    </BaseLayout>
  );
};

export default CalendarPage;
