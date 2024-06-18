'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import { Attendance } from "@/utils/types";
import { useAttendanceStore } from "@/zustand/EmployeeAttendances";
import React from "react";

const page = () => {

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
 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employees / attendances" />
      <CustomDataTable
        title="Employee Attendance Records"
        columns={attendanceColumns}
        data={attendances}
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
