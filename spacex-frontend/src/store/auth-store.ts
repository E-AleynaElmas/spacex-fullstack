import { GET } from "@/api/client";
import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  token: string | undefined;
  user:
    | {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
      }
    | undefined;
};

export type AuthActions = {
  logout: () => void;
  setToken: (token: string) => void;
  setUser: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultState: AuthState = {
  token: undefined,
  user: undefined,
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthState>((set) => ({
    ...initState,
    setToken: async (token: string) => {
      set({ token });
    },
    logout: () => console.log("logout"),
    setUser: () => console.log("setUser"),
  }));
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setToken: async (token: string) => {
        set({ token });
        localStorage.setItem("token", token ?? "undefined");
        document.cookie = `token=${token}; path=/`;
        await get().setUser();
      },

      logout: () => {
        set({ token: "", user: undefined });
        localStorage.removeItem("token");

        // Remove the token from cookies
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      },

      setUser: async () => {
        try {
          const response = await GET("/auth/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().token}`,
            },
          });

          // Gelen kullanıcı bilgilerini state'e set et
          if (response && response.data) {
            set({ user: response.data });
          } else {
            console.error("User data is undefined from /auth/me");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          set({ user: undefined }); // Hata durumunda kullanıcıyı undefined yapabiliriz.
        }
      },
    }),
    { name: "auth-store" }
  )
);
