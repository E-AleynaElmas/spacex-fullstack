import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { POST } from "../client";

interface CreateFeedData {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const useCreateFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateFeedData) => {
      const response = await POST("/feed", {
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
      toast.error("Failed to create feed");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Feed created successfully");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      router.push("/");
    },
  });
};

export default useCreateFeed;
