    import { Employee } from "@/utils/types";
    import { create } from "zustand";
    import { persist } from "zustand/middleware";
    export type EmployeeState = {
        employees: Employee[],
        setEmployees: (employees: Employee[]) => void;
    }

    export const useEmployeeStore = create<EmployeeState>()(
        persist(
          ( set ) => ({
            employees: [],
            setEmployees: (employees: Employee[]) => set({ employees })
          }),
          {
            name: 'employees-storage',
            getStorage: () => localStorage      
          },
        )
    )
