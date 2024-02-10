import { IEvents } from "@/interface/events.interface";
import { create } from "zustand";

interface UseUpdateModalInterface {
  isOpen: boolean;
  initialData: IEvents | null;
  setInitialData: (event: IEvents) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateModal = create<UseUpdateModalInterface>((set) => ({
  isOpen: false,
  initialData: null,
  setInitialData: (event: IEvents) => set({ initialData: event }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ initialData: null, isOpen: false }),
}));
