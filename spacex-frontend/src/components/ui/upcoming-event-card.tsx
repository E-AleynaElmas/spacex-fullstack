import React from "react";
import Image from "next/image";
import { formatDateToTurkish } from "@/lib/utils";

interface UpcomingEventCardProps {
  title: string;
  date: string;
  imageUrl: string;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  title,
  date,
  imageUrl,
}) => {
  // Tarih ve saati formatlama
  const { formattedDate, formattedTime } = formatDateToTurkish(date);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg min-w-[250px]">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{formattedDate}</p>
        <p className="text-gray-400">{formattedTime}</p>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
