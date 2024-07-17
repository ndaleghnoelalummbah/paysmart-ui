'use client';
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import { EmployeePayment } from "@/utils/types";
import { usePaymentStore } from "@/zustand/EmployeePayments";
import { Metadata } from "next";
import ChartOne from "@/components/Charts/ChartOne";
import { ApexOptions } from "apexcharts";



const Page = () => {
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
      name: "Income tax",
      selector: (row: EmployeePayment) => row.income_tax,
      sortable: true,
    },
    {
      name: "Employee CNPS contribution",
      selector: (row: EmployeePayment) => row.employee_cnps_contribution,
      sortable: true,
    },
    {
      name: "Employer CNPS contribution",
      selector: (row: EmployeePayment) => row.employer_cnps_contribution,
      sortable: true,
    },
    {
      name: "Gross pay",
      selector: (row: EmployeePayment) => row.gross_pay,
      sortable: true,
    },
    {
      name: "Net pay",
      selector: (row: EmployeePayment) => row.net_pay,
      sortable: true,
    },
  ];

 

 

  const monthly_tax = payments.map((item: EmployeePayment) => item.income_tax);
  const monthly_cnps_contribution = payments.map(
    (item: EmployeePayment) => item.employee_cnps_contribution,
  );
  const monthly_gross_pay = payments.map(
    (item: EmployeePayment) => item.gross_pay,
  );
  const monthly_net_pay = payments.map((item: EmployeePayment) => item.net_pay);

  const series = [
    {
      name: "Income Tax",
      data: monthly_tax,
    },

    {
      name: "CNPS Contribution",
      data: monthly_cnps_contribution,
    },
    {
      name: "Gross Pay",
      data: monthly_gross_pay,
    },

    {
      name: "Net Pay",
      data: monthly_net_pay,
    },
  ];

  const chartLabel = [
    {
      color: "red",
      name: "Income Tax",
    },
    {
      color: "body",
      name: "CNPS Contribution",
    },
    {
      color: "primary",
      name: "Gross Pay",
    },
    {
      color: "secondary",
      name: "Net Pay",
    },
  ];

  const data = [
   ... monthly_tax,
   ... monthly_cnps_contribution,
   ... monthly_gross_pay,
   ... monthly_net_pay,
  ];
  const max = Math.max(...data);

   const options: ApexOptions = {
     legend: {
       show: false,
       position: "top",
       horizontalAlign: "left",
     },
     colors: ["#FB5454", "#64748B", "#3B82F6", "#80CAEE"],
     chart: {
       fontFamily: "Satoshi, sans-serif",
       height: 335,
       type: "area",
       dropShadow: {
         enabled: true,
         color: "#623CEA14",
         top: 10,
         blur: 4,
         left: 0,
         opacity: 0.1,
       },

       toolbar: {
         show: false,
       },
     },
     responsive: [
       {
         breakpoint: 1024,
         options: {
           chart: {
             height: 300,
           },
         },
       },
       {
         breakpoint: 1366,
         options: {
           chart: {
             height: 350,
           },
         },
       },
     ],
     stroke: {
       width: [2, 2],
       curve: "straight",
     },
     // labels: {
     //   show: false,
     //   position: "top",
     // },
     grid: {
       xaxis: {
         lines: {
           show: true,
         },
       },
       yaxis: {
         lines: {
           show: true,
         },
       },
     },
     dataLabels: {
       enabled: false,
     },
     markers: {
       size: 4,
       colors: "#fff",
       strokeColors: ["#FB5454", "#64748B", "#3B82F6", "#80CAEE"],
       strokeWidth: 3,
       strokeOpacity: 0.9,
       strokeDashArray: 0,
       fillOpacity: 1,
       discrete: [],
       hover: {
         size: undefined,
         sizeOffset: 5,
       },
     },
     xaxis: {
       type: "category",
       categories: payments.map((item) => {
         const date = new Date(item.payment.payslip_issue_date);
         return date.toLocaleString("default", { month: "long" });
       }),

       axisBorder: {
         show: false,
       },
       axisTicks: {
         show: false,
       },
     },
     yaxis: {
       title: {
         style: {
           fontSize: "0px",
         },
       },
       min: 0,
       max: Math.ceil(max)
     },
   };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment-summary" />
      <CustomDataTable
        title="Employee Payment Records"
        columns={paymentColumns}
        data={payments}
        withAction={false}
      />
      <ChartOne options={options} series={series} chartLabel={chartLabel} heading='Payment Summary' />
    </DefaultLayout>
  );
};

export default Page;
