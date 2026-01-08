import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AddressData {
  fullAddress: string;
  houseNo?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  lat?: number;
  lng?: number;
}

interface UserStore {
  user: UserData | null;
  userId: number | null;
  accessToken: string | null;
  isVerified: boolean;
  address: AddressData | null;
  setUser: (user: UserData) => void;
  setUserId: (id: number | null) => void;
  setAccessToken: (token: string | null) => void;
  setVerified: (verified: boolean) => void;
  setAddress: (address: AddressData | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      accessToken: null,
      isVerified: false,
      address: null,
      setUser: (user) => set({ user }),
      setUserId: (id) => set({ userId: id }),
      setAccessToken: (token) => set({ accessToken: token }),
      setVerified: (verified) => set({ isVerified: verified }),
      setAddress: (address) => set({ address }),
      logout: () => set({ user: null, userId: null, accessToken: null, isVerified: false }),
    }),
    {
      name: 'custom-order-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
