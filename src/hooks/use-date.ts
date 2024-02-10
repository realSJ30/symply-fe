import { create } from "zustand";

interface DateInterface {
  date: Date;
  onChange: (date: Date) => void;
}

export const useDate = create<DateInterface>((set) => ({
  date: new Date(),
  onChange: (newDate: Date) => set({ date: newDate }),
}));
