import { MostRecentEmployeePayment } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RecentPaymentState = {
  recent_payments: MostRecentEmployeePayment[];
  setRecentPayments: (recent_payments: MostRecentEmployeePayment[]) => void;
};

export const useRecentPaymentStore = create<RecentPaymentState>()(
  persist(
    (set) => ({
      recent_payments: [],
      setRecentPayments: (recent_payments: MostRecentEmployeePayment[]) =>
        set({ recent_payments }),
    }),
    {
      name: "recent-payment-storage",
      getStorage: () => localStorage,
    },
  ),
);
