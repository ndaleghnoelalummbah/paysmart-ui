import { toast } from "react-toastify";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useAnualPaymentStore } from "@/zustand/AnualPaymentSummary";
import { useRecentPaymentStore } from "@/zustand/MostRecentPay";

export const useGetPaymentDetails = () => {
  const { user } = useUserStore();
  const { setAnualPayments } = useAnualPaymentStore();
  const { setRecentPayments } = useRecentPaymentStore();

  const getAnualPayments = async () => {
    try {
      const response = await API.getAnualPayments(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const anual_payments = data.map((item: any) => {
          return {
            total_income_tax: item.total_income_tax,
            total_overtime: item.total_overtime,
            total_normal_pay_hours: item.total_normal_pay_hours,
            total_overtime_pay: item.total_overtime_pay,
            total_net_pay: item.total_net_pay,
            total_gross_pay: item.total_gross_pay,
            total_house_allowance_pay: item.total_house_allowance_pay,
            total_longevity_allowance_pay: item.total_longevity_allowance_pay,
            total_cnps_contribution: item.total_cnps_contribution,
            total_leave_pay: item.total_leave_pay,
            // total_retirement_pay: item.total_retirement_pay,
            payment: item.payment,
          };
        });
        setAnualPayments(anual_payments);
        toast.success(res.message);
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const getRecentPayments = async () => {
    try {
      const response = await API.getRecentPayments(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const recent_payments = data.map((item: any) => {
          return {
            total_income_tax: item.total_income_tax,
            total_overtime: item.total_overtime,
            total_normal_pay_hours: item.total_normal_pay_hours,
            total_overtime_pay: item.total_overtime_pay,
            total_net_pay: item.total_net_pay,
            total_gross_pay: item.total_gross_pay,
            total_house_allowance_pay: item.total_house_allowance_pay,
            total_longevity_allowance_pay: item.total_longevity_allowance_pay,
            total_cnps_contribution: item.total_cnps_contribution,
            total_leave_pay: item.total_leave_pay,
            // total_retirement_pay: item.total_retirement_pay,
            total_employees_worked: item.total_employees_worked,
            total_employees_on_leave: item.total_employees_on_leave,
            // total_employees_on_retirement: item.total_employees_on_retirement,
            pending_pay: item.pending_pay,
            // payment: item.payment,
          };
        });

        setRecentPayments(recent_payments);

        toast.success(res.message);
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return {
    getAnualPayments,
    getRecentPayments,
  };
};
