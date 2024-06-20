import { useUserStore } from "@/zustand/Admin";
import { toast } from "react-toastify";
import { API } from "./fetcher";
export const usePaymentAction = () => {
  const { user } = useUserStore();
  const makePayment = async () => {
    try {
      const response = await API.makePayment(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
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
  
   const initiatePayment = async () => {
     try {
       const response = await API.initiatePayment(user?.accessToken as string);
       const statusCode = response[0];
       const res = await response[1];
       const status = response[2];

       if (status) {
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
    makePayment,
    initiatePayment
  }
};
