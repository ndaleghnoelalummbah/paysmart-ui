// "use client";
import CustomDataTable from "@/components/table/CustomDataTable";
import { YearlyEmployeePaymentSummary } from "@/utils/types";
import { useAnualPaymentStore } from "@/zustand/AnualPaymentSummary";
import React, { useEffect } from "react";
import { useGetPaymentDetails } from "@/utils/useGetPaymentDetails";
import { useUserStore } from "@/zustand/Admin";
import { ApexOptions } from "apexcharts";
import ChartOne from "../Charts/ChartOne";

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

  const monthly_tax = anual_payments.map(
    (item: YearlyEmployeePaymentSummary) => item.total_income_tax,
  );
  const monthly_cnps_contribution = anual_payments.map(
    (item: YearlyEmployeePaymentSummary) => item.total_cnps_contribution,
  );
  const monthly_gross_pay = anual_payments.map(
    (item: YearlyEmployeePaymentSummary) => item.total_gross_pay,
  );
  const monthly_pay_package = anual_payments.map(
    (item: YearlyEmployeePaymentSummary) => item.payment.total_pay_with_cnps,
  );

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
      name: "Pay Package",
      data: monthly_pay_package,
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
    ...monthly_tax,
    ...monthly_cnps_contribution,
    ...monthly_gross_pay,
    ...monthly_pay_package,
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
      categories: anual_payments.map((item) => {
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
      max: Math.ceil,
    },
  };

  return (
    <>
      <CustomDataTable
        title="Anual Payment Records"
        columns={paymentColumns}
        data={anual_payments}
        withAction={false}
        pagination={false}
      />
      <ChartOne options={options} series={series} chartLabel={chartLabel} heading='Anual Payment Summary'/>
    </>
  );
};

export default AnualSummaryReport;
