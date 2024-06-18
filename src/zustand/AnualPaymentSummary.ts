import { YearlyEmployeePaymentSummary } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AnualPaymentState = {
  anual_payments: YearlyEmployeePaymentSummary[];
  setAnualPayments: (anual_payments: YearlyEmployeePaymentSummary[]) => void;
};

export const useAnualPaymentStore = create<AnualPaymentState>()(
  persist(
    (set) => ({
      anual_payments: [],
      setAnualPayments: (anual_payments: YearlyEmployeePaymentSummary[]) => set({ anual_payments }),
    }),
    {
      name: "anual-payment-storage",
      getStorage: () => localStorage,
    },
  ),
);
