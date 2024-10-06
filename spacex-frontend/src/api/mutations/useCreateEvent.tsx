import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APISchemas, POST } from "../client";

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: APISchemas["CreateEventDto"]) => {
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
