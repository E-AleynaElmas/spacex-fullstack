import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APISchemas, PUT } from "../client";


const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: APISchemas["UpdateEventDto"]) => {
      const response = await PUT("/feed/events/{id}", {
        params:{
          path:{
            id: data.id
          }
        },
        body: {
        title: data.title,
        date: data.date,
        imageUrl: data.imageUrl,
        
        },
      });
      return response;
    },
    onError: (error) => {
      toast.error("Failed to update event");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["feedEvents"] });
    },
  });
};

export default useUpdateEvent;