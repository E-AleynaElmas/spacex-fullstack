import { components } from "@/api/apischema";
import createClient, { Middleware } from "openapi-fetch";
import { paths } from "./apischema";
import { useAuthStore } from "@/store/auth-store";

const { GET, POST, PUT, DELETE, PATCH, use } = createClient<paths>({
  headers: { "Content-Type": "application/json" },
  baseUrl: "http://localhost:3000",
});

export type APISchemas = components["schemas"];

export { DELETE, GET, PATCH, POST, PUT };

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = useAuthStore.getState().token;

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    
    return request;
  },
  async onResponse({ response }) {
    if (!response.ok) {
      // Hata durumunda hatayı fırlat
      const errorBody = await response.json();
      throw new Error(errorBody.message || "An error occurred");
    }
    
    return response; // Hatalı değilse normal response döndür
  },
};

// Middleware kullanımı
use(authMiddleware);