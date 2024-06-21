import { useUserStore } from "@/zustand/Admin";
import { toast } from "react-toastify";
import { API } from "./fetcher";
import { useGetPaymentDetails } from "./useGetPaymentDetails";
import { useState } from "react";

export const usePaymentAction = () => {
  const { user } = useUserStore();
  const { getRecentPayments, getAnualPayments } = useGetPaymentDetails();
  const [initiatingPay, setInitiatingPay] = useState(false);
  const [makingPay, setMakingPay] = useState(false);

  const makePayment = async () => {
    try {
      setMakingPay(true);
      const response = await API.makePayment(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        toast.success(res.message);
        getRecentPayments();
        getAnualPayments();
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setMakingPay(false);
    }
  };

  const initiatePayment = async () => {
    try {
      setInitiatingPay(true);
      const response = await API.initiatePayment(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        toast.success(res.message);
        getRecentPayments();
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    } finally{
      setInitiatingPay(false);
    }
  };
  return {
    makePayment,
    initiatePayment,
    makingPay,
    initiatingPay
  };
};
