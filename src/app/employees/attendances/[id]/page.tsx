'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import { Attendance } from "@/utils/types";
import { useAttendanceStore } from "@/zustand/EmployeeAttendances";
import { Metadata } from "next";
import React from "react";
import { ApexOptions } from "apexcharts";
import ChartOne from "@/components/Charts/ChartOne";


// export const metadata: Metadata = {
//   title: "Employee Attendance | PaySmart - Payroll Management",
//   description:
//     "View attendance records for each employee of the organization.",
// };

const Page = () => {
 const { attendances } = useAttendanceStore();
 const attendanceColumns = [
   {
     name: "Month",
     selector: (row: Attendance) => row.month,
     sortable: true,
   },
   {
     name: "Days Worked",
     selector: (row: Attendance) => row.days_worked,
     sortable: true,
   },
   {
     name: "Sick Days",
     selector: (row: Attendance) => row.sick_days,
     sortable: true,
   },
   {
     name: "Public Holidays",
     selector: (row: Attendance) => row.holidays,
     sortable: true,
   },
   {
     name: "Total Normal Pay Hours",
     selector: (row: Attendance) => row.total_normal_pay_hours,
     sortable: true,
   },
   {
     name: "Total Overtime Hour",
     selector: (row: Attendance) => row.total_overtime_hour,
     sortable: true,
   },
   {
     name: "Total Absences",
     selector: (row: Attendance) => row.total_absences,
     sortable: true,
   },
 ];


 const chartLabel = [
   {
     color: "red",
     name: "Days Absent",
   },
   {
     color: "body",
     name: "Days Sick",
   },
   {
     color: "primary",
     name: "Days Present",
   },
 ];



   const sick = attendances.map((item:  Attendance) => item.sick_days);
   const absences = attendances.map(
     (item:  Attendance) => item.total_absences,
   );
   const present = attendances.map(
     (item:  Attendance) => item.days_worked,
   );
  

   const series = [
     {
       name: "Days Absent",
       data: absences,
     },
     {
       name: "Days Sick",
       data: sick,
     },
     {
       name: "Days Present",
       data: present,
     },
   ];
 const data = [
   ...sick,
   ...absences,
   ...present,
 ];
 const max = Math.max(...data);

 const options: ApexOptions = {
   legend: {
     show: false,
     position: "top",
     horizontalAlign: "left",
   },
   //, "#80CAEE"
   colors: ["#FB5454", "#64748B", "#3B82F6"],
   // colors: [ "#FB5454",
   //      "#3B82F6",
   //      "#80CAEE",
   //      "#64748B",
   //      "#3B82F6",
   //      "#FB5454",],
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
     strokeColors: ["#FB5454", "#64748B", "#3B82F6"],
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
     categories: attendances.map((item) => item.month),

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
     max: Math.ceil(max),
   },
 };
 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Attendances" />
      <CustomDataTable
        title="Employee Attendance Records"
        columns={attendanceColumns}
        data={attendances}
        withAction={false}
      />
      <ChartOne options={options} series={series} chartLabel={chartLabel} heading='Attendance summary'/>
    </DefaultLayout>
  );
};

export default Page;
