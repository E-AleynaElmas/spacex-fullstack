import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { APISchemas, POST } from "../client";
import { toast } from "sonner"


const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: APISchemas["CreateUserDto"]) => {
      const response = await POST("/auth/register", {
        body: {
          "email": data.email,
          "password": data.password,
          "firstName": data.firstName,
          "lastName": data.lastName,
        },
      });
      return response.data;
    },
    onError: (error) => {
      toast.error("Failed to create account");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/auth/login");
    },
  });
};

export default useRegister;
