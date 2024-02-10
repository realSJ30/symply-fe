import { create } from "zustand";

interface UseCreateModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateModal = create<UseCreateModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
