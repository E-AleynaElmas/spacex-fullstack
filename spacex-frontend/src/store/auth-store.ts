import { APISchemas, GET } from "@/api/client";
import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  token: string | undefined;
  user: APISchemas | undefined;
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
        set({ token: "" });
        localStorage.removeItem("token");
      },
      setUser: async () => {
        const {} = await GET("/auth/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().token}`,
          },
        });
      },
    }),
    { name: "auth-store" }
  )
);
