import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DELETE } from "../client";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await DELETE("/feed/events/{id}", {
        params: { 
            path:{
                id
            }
         },
      });
      return response;
    },
    onError: (error) => {
      toast.error("Failed to delete event");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["feedEvents"] });
    },
  });
};

export default useDeleteEvent;
