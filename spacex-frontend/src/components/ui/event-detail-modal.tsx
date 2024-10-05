import { formatDateToDefault } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import CircleSpinner from "./circle-spinner";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { TrashIcon } from "@/assets/icons/trash-icon";

interface EventDetailModalProps {
  event: {
    title: string;
    date: string;
    imageUrl: string;
    description: string;
  };
  open: boolean;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  open,
  onClose,
}) => {
  const { formattedDate, formattedTime } = formatDateToDefault(event.date);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date(event.date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        setTimeLeft("Etkinlik bitti");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}g ${hours}s ${minutes}d ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event.date]);

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleTrashClick = () => {
    console.log("Trash button clicked");
  };

  return (
    <Modal open={open} onClose={onClose} className="w-full md:w-1/2 lg:w-1/3">
      <div className="rounded-lg overflow-hidden w-full">
        <div className="relative">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={400}
            height={336}
            className="w-full h-80 object-cover rounded-md brightness-75"
          />
          <h3 className="absolute top-6 left-6 text-white text-lg font-semibold">
            {event.title}
          </h3>

          <div className="absolute bottom-0 left-0 w-full h-[20%] bg-black bg-opacity-50 backdrop-blur-sm rounded-md flex justify-center items-center px-4">
            {!timeLeft ? (
              <CircleSpinner className="w-7 h-7" />
            ) : timeLeft === "Etkinlik bitti" ? (
              <span className="text-white text-center w-full">
                Etkinlik bitti
              </span>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="text-white">Starter</span>
                <span className="text-white">{timeLeft}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-400 mb-2">
            {formattedDate} {formattedTime}
          </p>
          <p className="text-gray-400 text-center break-words">
            {event.description}
          </p>
        </div>

        {/* Butonları burada ekliyoruz */}
        <button
          className="absolute right-20 top-10 z-50"
          onClick={handleBackClick}
        >
          <ArrowBackCircleIcon color="#f0f0f0" />
        </button>
        <button
          className="absolute right-10 top-10 z-50"
          onClick={handleTrashClick}
        >
          <TrashIcon color="#f0f0f0" />
        </button>
      </div>
    </Modal>
  );
};

export default EventDetailModal;