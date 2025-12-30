import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserData {
  name: string;
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
  isVerified: boolean;
  address: AddressData | null;
  setUser: (user: UserData) => void;
  setVerified: (verified: boolean) => void;
  setAddress: (address: AddressData | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isVerified: false,
      address: null,
      setUser: (user) => set({ user }),
      setVerified: (verified) => set({ isVerified: verified }),
      setAddress: (address) => set({ address }),
      logout: () => set({ user: null, isVerified: false, address: null }),
    }),
    {
      name: 'custom-order-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
