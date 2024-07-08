// "use client";
import CustomDataTable from "@/components/table/CustomDataTable";
import { YearlyEmployeePaymentSummary } from "@/utils/types";
import { useAnualPaymentStore } from "@/zustand/AnualPaymentSummary";
import React, { useEffect } from "react";
import { useGetPaymentDetails } from "@/utils/useGetPaymentDetails";
import { useUserStore } from "@/zustand/Admin";

export const AnualSummaryReport = () => {
  const { anual_payments } = useAnualPaymentStore();
  const { getAnualPayments } = useGetPaymentDetails();
  const { user } = useUserStore();

  useEffect(() => {
    getAnualPayments();
  }, [user?.accessToken]);

  const paymentColumns = [
    {
      name: "payslip Issue dates",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.payment.payslip_issue_date,
      sortable: true,
    },
    {
      name: "Payment dates",
      selector: (row: YearlyEmployeePaymentSummary) => row.payment.payment_date,
      sortable: true,
    },
    {
      name: "Pay Hours",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.total_normal_pay_hours,
      sortable: true,
    },
    {
      name: "Total Overtime",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_overtime,
      sortable: true,
    },
    {
      name: "Total Normal Pay Hours",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.total_normal_pay_hours,
      sortable: true,
    },
    {
      name: "Income tax",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_income_tax,
      sortable: true,
    },
    {
      name: "CNPS contribution",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.total_cnps_contribution,
      sortable: true,
    },
    {
      name: "Overtime pay",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_overtime_pay,
      sortable: true,
    },

    {
      name: "House allowance",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.total_house_allowance_pay,
      sortable: true,
    },
    {
      name: "Longevity bonus",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.total_longevity_allowance_pay,
      sortable: true,
    },
    {
      name: "Leave pay",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_leave_pay,
      sortable: true,
    },
    {
      name: "Net pay",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_net_pay,
      sortable: true,
    },
    {
      name: "Gross pay",
      selector: (row: YearlyEmployeePaymentSummary) => row.total_gross_pay,
      sortable: true,
    },
    {
      name: "Pay Package",
      selector: (row: YearlyEmployeePaymentSummary) =>
        row.payment.total_pay_with_cnps,
      sortable: true,
    },
  ];

  return (
    <CustomDataTable
      title="Anual Payment Records"
      columns={paymentColumns}
      data={anual_payments}
      withAction={false}
      pagination={false}
    />
  );
};

export default AnualSummaryReport;
