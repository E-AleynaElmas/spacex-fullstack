import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APISchemas, PUT } from "../client";


const useUpdateFeed = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: APISchemas["UpdateFeedDto"]) => {
      const response = await PUT("/feed/{id}", {
        params:{
          path:{
            id: data.id
          }
        },
        body: {
        description: data.description,
        title: data.title,
        date: data.date,
        imageUrl: data.imageUrl,
        
        },
      });
      return response;
    },
    onError: (error) => {
      toast.error("Failed to update feed");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Feed updated successfully");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export default useUpdateFeed;