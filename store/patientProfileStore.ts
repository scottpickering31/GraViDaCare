// store/patientProfileStore.ts
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PatientProfileStore = {
  activePatientId: string | null;
  setActivePatientId: (id: string | null) => void;
  clear: () => void;
};

export const usePatientProfileStore = create(
  persist<PatientProfileStore>(
    (set) => ({
      activePatientId: null,
      setActivePatientId: (id) => set({ activePatientId: id }),
      clear: () => set({ activePatientId: null }),
    }),
    {
      name: "activePatientId",
      storage: {
        getItem: async (name) => {
          const value = await SecureStore.getItemAsync(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await SecureStore.setItemAsync(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await SecureStore.deleteItemAsync(name);
        },
      },
    }
  )
);
