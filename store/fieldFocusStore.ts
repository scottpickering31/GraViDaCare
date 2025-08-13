import { create } from "zustand";

type FocusStore = {
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
};

export const useFieldFocusStore = create<FocusStore>((set) => ({
  focusedField: null,
  setFocusedField: (field) => set({ focusedField: field }),
}));
