import React from "react";
import BaseLayout from "@/components/layouts/base-layout";
import UpcomingEvents from "@/components/ui/upcoming-events";
import RecentLaunches from "@/components/ui/recent-launches";

const Home: React.FC = () => {
  return (
    <BaseLayout>
      <div className="space-y-8">
        <UpcomingEvents />
        <RecentLaunches />
      </div>
    </BaseLayout>
  );
};

export default Home;
