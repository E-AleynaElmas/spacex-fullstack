import BaseLayout from "@/components/layouts/base-layout";
import React from "react";

const LivePage: React.FC = () => {
  return (
    <BaseLayout>
      <div className="space-y-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Live</h2>
      </div>
    </BaseLayout>
  );
};

export default LivePage;
