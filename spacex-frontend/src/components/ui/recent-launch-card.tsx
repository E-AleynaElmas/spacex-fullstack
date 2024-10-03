import React from "react";
import Image from "next/image";
import { formatDateToTurkish } from "@/lib/utils";

interface RecentLaunchCardProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const RecentLaunchCard: React.FC<RecentLaunchCardProps> = ({
  title,
  description,
  date,
  imageUrl,
}) => {
  const { formattedDate, formattedTime } = formatDateToTurkish(date);
  return (
    <div className="flex flex-row space-x-4">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex w-5/6">
        <Image
          src={imageUrl}
          alt={title}
          width={128}
          height={128}
          className="w-32 h-32 object-cover"
        />
        <div className="p-4 flex-1">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-col flex w-1/6 justify-center items-center">
        <p className="text-gray-400">{formattedDate}</p>
        <p className="text-gray-400">{formattedTime}</p>
      </div>
    </div>
  );
};

export default RecentLaunchCard;
