import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DELETE } from "../client";

const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id:number) => {
      console.log("Deleting event with id:", id);
      const response = await DELETE("/feed/{id}", {
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
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export default useDeleteFeed;
