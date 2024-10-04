import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APISchemas, POST } from "../client";
import { useAuthStore } from "@/store/auth-store";

const useLogin = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async (data: APISchemas["LoginDto"]) => {
      const response = await POST("/auth/login", {
        body: {
          email: data.email,
          password: data.password,
        },
      });
      return response.data;
    },
    onError: (error) => {
      toast.error("Failed to login");
      console.error(error);
    },
    onSuccess: async (data) => {
      const { access_token } = data; 
      toast.success("Login successful");
      await setToken(access_token);

      router.push("/");
    },
  });
};

export default useLogin;
