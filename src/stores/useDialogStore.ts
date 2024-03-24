import { create } from "zustand";

export interface StoreState {
  createMeetingOpen: boolean;
  setCreateMeetingOpen: (value: boolean) => void;
  joinMeetingOpen: boolean;
  setJoinMeetingOpen: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  meetingLinkOpen: boolean;
  setIsMeetingLinkOpen: (value: boolean) => void;
}

export const useDialogStore = create<StoreState>()((set) => ({
  createMeetingOpen: false,
  setCreateMeetingOpen: (value: boolean) => set({ createMeetingOpen: value }),
  joinMeetingOpen: false,
  setJoinMeetingOpen: (value: boolean) => set({ joinMeetingOpen: value }),
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  meetingLinkOpen: false,
  setIsMeetingLinkOpen: (value: boolean) => set({ meetingLinkOpen: value }),
}));
