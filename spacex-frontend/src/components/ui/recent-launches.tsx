"use client";
import useGetFeed from "@/api/queries/useGetFeed";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import AddFeedModal from "./add-feed-modal";
import CircleSpinner from "./circle-spinner";
import RecentLaunchCard from "./recent-launch-card";

interface RecentLaunchesProps {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const RecentLaunches: React.FC = () => {
  const { data: feedData, isLoading: feedIsLoading } = useGetFeed();
  const [openModal, setOpenModal] = useState(false);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-semibold">Recent Launch</h2>
        <PlusIcon
          className="h-6 w-6 text-white"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className="space-y-4">
        {feedIsLoading ? (
          <div className="flex justify-center items-center">
            <CircleSpinner className="w-10 h-10" />
          </div>
        ) : (
          feedData.map((launch: RecentLaunchesProps) => (
            <RecentLaunchCard
              id={launch.id}
              key={launch.id}
              title={launch.title}
              description={launch.description}
              date={launch.date}
              imageUrl={launch.imageUrl}
            />
          ))
        )}
      </div>
      {openModal && (
        <AddFeedModal open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default RecentLaunches;
