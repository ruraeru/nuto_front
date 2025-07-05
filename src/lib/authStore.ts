import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  refreshToken: string | null;
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  setTokens: (refreshToken: string, accessToken: string) => void;
  setLoginState: (isLoggedIn: boolean, userId: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      refreshToken: null,
      isLoggedIn: false,
      userId: null,
      accessToken: null,
      setTokens: (refreshToken, accessToken) =>
        set({ refreshToken, accessToken }),
      setLoginState: (isLoggedIn, userId) => set({ isLoggedIn, userId }),
      logout: () =>
        set({
          refreshToken: null,
          accessToken: null,
          isLoggedIn: false,
          userId: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
