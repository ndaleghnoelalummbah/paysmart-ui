'use client';
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import { EmployeePayment } from "@/utils/types";
import { usePaymentStore } from "@/zustand/EmployeePayments";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Payment Summary | PaySmart - Payroll Management",
//   description: "View detailed payment summaries for each employee in the organization.",
// };

const page = () => {
  const { payments } = usePaymentStore();
  const paymentColumns = [
    {
      name: "payslip Issue date",
      selector: (row: EmployeePayment) => row.payment.payslip_issue_date,
      sortable: true,
    },
    {
      name: "Payment date",
      selector: (row: EmployeePayment) => row.payment.payment_date,
      sortable: true,
    },
    {
      name: "Pay Hours",
      selector: (row: EmployeePayment) => row.total_normal_pay_hours,
      sortable: true,
    },
    {
      name: "Public Holidays",
      selector: (row: EmployeePayment) => row.total_overtime,
      sortable: true,
    },
    {
      name: "Total Normal Pay Hours",
      selector: (row: EmployeePayment) => row.total_normal_pay_hours,
      sortable: true,
    },
    {
      name: "Income tax",
      selector: (row: EmployeePayment) => row.income_tax,
      sortable: true,
    },
    {
      name: "Redtirement deduction",
      selector: (row: EmployeePayment) => row.retirement_deduction,
      sortable: true,
    },
    {
      name: "Overtime pay",
      selector: (row: EmployeePayment) => row.overtime_pay,
      sortable: true,
    },

    {
      name: "House allowance",
      selector: (row: EmployeePayment) => row.house_allowance_pay,
      sortable: true,
    },
    {
      name: "Longevity bonus",
      selector: (row: EmployeePayment) => row.longevity_allowance_pay,
      sortable: true,
    },
    {
      name: "Leave pay",
      selector: (row: EmployeePayment) => row.leave_pay,
      sortable: true,
    },
    {
      name: "Net pay",
      selector: (row: EmployeePayment) => row.net_pay,
      sortable: true,
    },
    {
      name: "Gross pay",
      selector: (row: EmployeePayment) => row.gross_pay,
      sortable: true,
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment-summary" />
      <CustomDataTable
        title="Employee Payment Records"
        columns={paymentColumns}
        data={payments}
        withAction={false}
        // handleView={handleViewEmployee}
        // handleDelete={handleDeleteAdmin}
        // onPageChange={handlePageChange}
        // viewAttendances={viewEmployeeAtendances}
        // viewPayments={viewEmployeePayments}
        // paginate={{
        //   current_page: pagination.current_page,
        //   last_page: pagination.last_page,
        //   per_page: pagination.per_page,
        //   onPageChange: handlePageChange,
        // }}
      />
    </DefaultLayout>
  );
};

export default page;
