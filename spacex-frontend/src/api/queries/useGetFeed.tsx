import { useQuery } from "@tanstack/react-query";
import { GET } from "../client";

const useGetFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await GET("/feed");
      return res.data;
    },
  });
};

export default useGetFeed;
