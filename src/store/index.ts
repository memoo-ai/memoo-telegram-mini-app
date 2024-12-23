import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  pubKey: string;
  setPubKey: (key: string) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (isFirstVisit: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      pubKey: '',
      setPubKey: (key) => set({ pubKey: key }),
      isFirstVisit: true,
      setIsFirstVisit: (isFirstVisit: boolean) => set({ isFirstVisit }),
    }),
    {
      name: 'pubKey-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useStore;
