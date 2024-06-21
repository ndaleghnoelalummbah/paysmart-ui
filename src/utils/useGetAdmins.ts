import React from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useAdminsStore } from "@/zustand/Admin";
import { Admin } from "./types";

const useGetAdmins = () => {
  const { user } = useUserStore();
  const { setAdmins, addAdmin } = useAdminsStore();

  const getAdmins = async () => {
    try {
      const response = await API.getAllAdmins(user?.accessToken as string);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const admins = data.map((item: any) => {
          return {
            id: item.admin.id,
            email: item.admin.email,
          };
        });

        setAdmins(admins);
        console.log("admins", admins, data);
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


    const addNewAdmin = async (values: Admin) => {
      try {
        const response = await API.createAdmin(
          values,
          user?.accessToken as string,
        );
        console.log("response", response);
        const statusCode = response[0];
        const res = await response[1];
        const status = response[2];

        if (status) {
          const user = res.data.admin;
          const admin = {
            id: user.id,
            email: user.email,
          };
          // AsyncStorage.setItem("token", res.data.user.accessToken);
          addAdmin(admin);
          toast.success(res.message);

          console.log("new admisns", values);
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
    getAdmins,
    addNewAdmin
  };
};

export default useGetAdmins;
