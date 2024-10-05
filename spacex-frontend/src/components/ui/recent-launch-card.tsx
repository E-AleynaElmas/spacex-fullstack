import useDeleteFeed from "@/api/mutations/useDeleteFeed";
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
import React from "react";
import { toast } from "sonner";

interface RecentLaunchCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const RecentLaunchCard: React.FC<RecentLaunchCardProps> = ({
  id,
  title,
  description,
  date,
  imageUrl,
}) => {
  const { formattedDate, formattedTime } = formatDateToDefault(date);

  const deleteEvent = useDeleteFeed();

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
    <div className="flex flex-row space-x-4 relative">
      <div className="bg-gray-800 p-4 rounded-lg justify-start items-start overflow-hidden shadow-lg h-40 flex w-5/6 relative">
        <Image
          src={imageUrl}
          alt={title}
          width={128}
          height={128}
          className="w-32 h-32 object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <div className="text-gray-400 break-all max-h-24 overflow-y-auto">
            {description}
          </div>
        </div>

        {/* Trash Icon for deletion with confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              aria-label="Delete Event"
            >
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
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-col flex w-1/6 justify-center items-center">
        <p className="text-gray-400">{formattedDate}</p>
        <p className="text-gray-400">{formattedTime}</p>
      </div>
    </div>
  );
};

export default RecentLaunchCard;
