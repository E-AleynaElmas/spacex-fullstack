import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { POST } from "../client";

interface CreateEventData {
  title: string;
  date: string;
  imageUrl: string;
}

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateEventData) => {
      const response = await POST("/feed/events", {
        body: {
          title: data.title,
          date: data.date,
          imageUrl: data.imageUrl,
        },
      });
      return response;
    },
    onError: (error) => {
      toast.error("Failed to create event");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["feedEvents"] });
    },
  });
};

export default useCreateEvent;
