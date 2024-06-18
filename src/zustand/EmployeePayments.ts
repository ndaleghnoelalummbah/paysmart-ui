import { EmployeePayment } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type EmplopeePaymentState = {
  payments: EmployeePayment[];
  setPayments: (payments: EmployeePayment[]) => void;
};

export const usePaymentStore = create<EmplopeePaymentState>()(
  persist(
    (set) => ({
      payments: [],
      setPayments: (payments: EmployeePayment[]) => set({ payments }),
    }),
    {
      name: "employee-payment-storage",
      getStorage: () => localStorage,
    },
  ),
);
