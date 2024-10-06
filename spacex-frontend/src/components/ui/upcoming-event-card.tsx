import useDeleteEvent from "@/api/mutations/useDeleteEvent";
import { TrashIcon } from "@/assets/icons/trash-icon"; // Assuming you have a trash icon component
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDateToDefault } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import UpdateEventModal from "./update-event-modal";
import { EditIcon } from "lucide-react";

interface UpcomingEventCardProps {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  id,
  title,
  date,
  imageUrl,
}) => {
  const { formattedDate, formattedTime } = formatDateToDefault(date);
  const [openUpdateEventModal, setOpenUpdateEventModal] = useState(false);

  const deleteEvent = useDeleteEvent();

  const handleDelete = async () => {
    console.log("Deleting event with id:", id);
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg min-w-[250px]">
      <Image
        src={imageUrl || "https://via.placeholder.com/150"}
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

      {/* Trash Icon for deletion with confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="absolute top-2 right-2" aria-label="Delete Event">
            <TrashIcon color="#f0f0f0" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button
          className="absolute top-2 right-12 text-red-600 hover:text-red-800"
          aria-label="Edit Event"
        >
          <EditIcon className="w-7 h-7" color="#f0f0f0" onClick={() => {setOpenUpdateEventModal(true)}} />
        </button>
      {openUpdateEventModal && (
        <UpdateEventModal
          open={openUpdateEventModal}
          eventData={{ id, title, date, imageUrl }}
          onClose={() => setOpenUpdateEventModal(false)}
        />
      )}
    </div>
  );
};

export default UpcomingEventCard;
