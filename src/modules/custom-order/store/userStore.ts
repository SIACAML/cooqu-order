import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface UserStore {
  user: UserData | null;
  isVerified: boolean;
  setUser: (user: UserData) => void;
  setVerified: (verified: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isVerified: false,
      setUser: (user) => set({ user }),
      setVerified: (verified) => set({ isVerified: verified }),
      logout: () => set({ user: null, isVerified: false }),
    }),
    {
      name: 'custom-order-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
