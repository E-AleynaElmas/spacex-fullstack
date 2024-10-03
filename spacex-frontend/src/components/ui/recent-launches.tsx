import { recentLaunches } from "@/lib/dummys/home-dummy-data";
import { PlusIcon } from "lucide-react";
import React from "react";
import RecentLaunchCard from "./recent-launch-card";

const RecentLaunches: React.FC = () => {
  return (
    <section>
      <div className="flex justify-between bg-red-500 items-center mb-4">
        <h2 className="text-white text-2xl font-semibold">Recent Launch</h2>
        <PlusIcon className="h-6 w-6 text-white" />
      </div>
      <div className="space-y-4">
        {recentLaunches.map((launch) => (
          <RecentLaunchCard
            key={launch.id}
            title={launch.title}
            description={launch.description}
            date={launch.date}
            imageUrl={launch.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentLaunches;
