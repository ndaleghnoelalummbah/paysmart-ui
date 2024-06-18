"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect } from "react";
import { useUserStore } from "@/zustand/Admin";
import { useRecentPaymentStore } from "@/zustand/MostRecentPay";
import { useGetPaymentDetails } from "@/utils/useGetPaymentDetails";
import ECommerce from "@/components/Dashboard/E-commerce";

const page = () => {
  const { user } = useUserStore();
  const { recent_payments } = useRecentPaymentStore();
  const { getRecentPayments } = useGetPaymentDetails();

  useEffect(() => {
    getRecentPayments();
  }, []);
  console.log("user", user);
  console.log("most recent pay", recent_payments);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dahboard" />
      <ECommerce />
    </DefaultLayout>
  );
};

export default page;
