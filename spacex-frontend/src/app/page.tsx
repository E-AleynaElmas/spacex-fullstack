import React from "react";
import BaseLayout from "@/components/layouts/base-layout";
import UpcomingEvents from "@/components/ui/upcoming-events";

const Home: React.FC = () => {
  return (
    <BaseLayout>
      <div className="space-y-8">
        <UpcomingEvents />
      </div>
    </BaseLayout>
  );
};

export default Home;
