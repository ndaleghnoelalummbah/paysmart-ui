import { Attendance } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type AttendanceState = {
  attendances: Attendance[];
  setAttendances: (attendances: Attendance[]) => void;
};

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      attendances: [],
      setAttendances: (attendances: Attendance[]) => set({ attendances }),
    }),
    {
      name: "employee-attendance-storage",
      getStorage: () => localStorage,
    },
  ),
);
