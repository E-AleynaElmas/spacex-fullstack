import { useQuery } from "@tanstack/react-query";
import { GET } from "../client";

const useGetFeedEvents = () => {
 return useQuery({
    queryKey: ["feedEvents"],
    queryFn: async () => {
      const res = await GET("/feed/events");
      return res.data;
    }

  });

};

export default useGetFeedEvents;
