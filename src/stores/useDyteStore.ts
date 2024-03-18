import { DyteMeetingData, DyteParticipantData } from "@/_types/DyteTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DyteStore {
  meetingData?: DyteMeetingData;
  setMeetingData: (value?: DyteMeetingData) => void;
  participantData?: DyteParticipantData;
  setParticipantData: (value?: DyteParticipantData) => void;
}

export const useDyteStore = create<DyteStore>()(
  persist(
    (set) => ({
      meetingData: undefined,
      setMeetingData: (value?: DyteMeetingData) => set({ meetingData: value }),
      participantData: undefined,
      setParticipantData: (value?: DyteParticipantData) =>
        set({ participantData: value }),
    }),
    {
      name: "dyte_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
