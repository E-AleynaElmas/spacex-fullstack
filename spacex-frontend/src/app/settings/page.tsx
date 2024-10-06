'use client'
import BaseLayout from "@/components/layouts/base-layout";
import React from "react";
import { useTranslation } from "react-i18next";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <div className="space-y-8">
        <h2 className="text-white text-2xl font-semibold mb-4">{t("settings.title")}</h2>
      </div>
    </BaseLayout>
  );
};

export default SettingsPage;
