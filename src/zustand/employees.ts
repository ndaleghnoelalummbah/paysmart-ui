import { PaginatedData } from "./../utils/types";
import { Employee, FilterParams } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type EmployeeState = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
};

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: [],
      setEmployees: (employees: Employee[]) => set({ employees }),
    }),
    {
      name: "employees-storage",
      getStorage: () => localStorage,
    },
  ),
);
export type FilterState = {
  filter_params: FilterParams;
  setFilterParams: (filter_params: FilterParams) => void;
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      filter_params: {
        matricule: "",
        position: "",
        department: "",
        min_overtime: "",
        min_absences: "",
        min_sick_days: "",
        page: "",
      },
      setFilterParams: (filter_params: FilterParams) => set({ filter_params }),
    }),
    {
      name: "filter_param-storage",
      getStorage: () => localStorage,
    },
  ),
);

export type PaginateState = {
  paginated_data: PaginatedData;
  setPaginatedData: (paginated_data: PaginatedData) => void;
};

export const usePaginatedDataStore = create<PaginateState>()(
  persist(
    (set) => ({
      paginated_data: {
        current_page: 1,
        per_page: 1,
        last_page: 1,
        total: 1,
      },
      setPaginatedData: (paginated_data: PaginatedData) =>
        set({ paginated_data }),
    }),
    {
      name: "paginated-data-store",
      getStorage: () => localStorage,
    },
  ),
);
