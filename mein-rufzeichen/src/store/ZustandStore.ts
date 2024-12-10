import { create } from "zustand";

type DeinRufzeichenState = {
  callsignPattern: string;
  setCallsignPattern: (callsignPattern: string) => void;
  includeClasses: {
    n: boolean;
    setN: (value: boolean) => void;
    e: boolean;
    setE: (value: boolean) => void;
    a: boolean;
    setA: (value: boolean) => void;
  };
  existingCallsignsUpdated: string;
  setExistingCallsignsUpdated: (updated: string) => void;
  existingCallsigns: string[];
  setExistingCallsigns: (callsigns: string[]) => void;
  availableCallsigns: string[];
  setAvailableCallsigns: (callsigns: string[]) => void;
};

export const useStore = create<DeinRufzeichenState>((set) => ({
  callsignPattern: "DN9CVR",
  setCallsignPattern: (callsignPattern: string) => set({ callsignPattern: callsignPattern }),
  includeClasses: {
    n: true,
    setN: (value: boolean) => set((state) => ({ includeClasses: { ...state.includeClasses, n: value } })),
    e: true,
    setE: (value: boolean) => set((state) => ({ includeClasses: { ...state.includeClasses, e: value } })),
    a: true,
    setA: (value: boolean) => set((state) => ({ includeClasses: { ...state.includeClasses, a: value } })),
  },
  existingCallsignsUpdated: "unbekannt",
  setExistingCallsignsUpdated: (updated: string) => set({ existingCallsignsUpdated: updated }),
  existingCallsigns: [],
  setExistingCallsigns: (callsigns: string[]) => set({ existingCallsigns: callsigns }),
  availableCallsigns: [],
  setAvailableCallsigns: (callsigns: string[]) => set({ availableCallsigns: callsigns }),
}));
