"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect } from "react";
import { useUserStore } from "@/zustand/Admin";
import { useRecentPaymentStore } from "@/zustand/MostRecentPay";
import { useGetPaymentDetails } from "@/utils/useGetPaymentDetails";
import CardDataStats from "@/components/CardDataStats";
import {
  FaMoneyBillWave,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
  FaChartLine,
  FaCoins,
  FaHome,
  FaAward,
  FaHandHoldingUsd,
  FaUserClock,
  FaUserCheck,
  FaUsers,
  FaUserTimes,
  FaUserSecret,
  FaQuestionCircle,
} from "react-icons/fa";
import AnualSummaryReport from "@/components/Reports/AnualSummaryReport";
import Button from "@/Button/Button";
import { usePaymentAction } from "@/utils/usePaymentAction";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard | PaySmart - Payroll Management",
//   description: "Overview of the most recent and the anual payroll details.",
// };

const page = () => {
  const { user } = useUserStore();
  const { recent_payments } = useRecentPaymentStore();
  const { getRecentPayments } = useGetPaymentDetails();
  const { makePayment, initiatePayment } = usePaymentAction()

  useEffect(() => {
    getRecentPayments();
  }, [user?.accessToken]);

  console.log("user", user);
  console.log("most recent pay", recent_payments);

  const iconMap = {
    total_income_tax: FaMoneyBillWave,
    total_overtime: FaClock,
    total_normal_pay_hours: FaHourglassHalf,
    total_overtime_pay: FaDollarSign,
    total_net_pay: FaChartLine,
    total_gross_pay: FaCoins,
    total_house_allowance_pay: FaHome,
    total_longevity_allowance_pay: FaAward,
    total_retirement_deduction: FaHandHoldingUsd,
    total_leave_pay: FaUserClock,
    total_retirement_pay: FaUserCheck,
    total_employees_worked: FaUsers,
    total_employees_on_leave: FaUserTimes,
    total_employees_on_retirement: FaUserSecret,
    pending_pay: FaQuestionCircle,
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <div className=" my-8 flex justify-end ">
        <div className="flex w-[300px] gap-4">
          <Button
            text="Initiate Payment"
            color="secondary"
            btnType={"button"}
            onClick={()=> initiatePayment()}
          />
          <Button
            text="Make Payment"
            color="primary"
            btnType={"button"}
            onClick={() => makePayment()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {recent_payments.map((entries, index) => (
          <React.Fragment key={index}>
            {Object.entries(entries).map(([key, value]) => {
              const Icon = iconMap[key] || FaQuestionCircle;
              return (
                <CardDataStats
                  key={key}
                  title={key.replace(/_/g, " ")}
                  total={value}
                  icon={Icon}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className=" mt-24">
        <AnualSummaryReport />
      </div>
    </DefaultLayout>
  );
};

export default page;
