"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/utils/types";
import { API } from "@/utils/fetcher";
import { useUserStore } from "@/zustand/Admin";
import { ToastContainer, toast } from "react-toastify";
import { useEmployeeStore } from "@/zustand/employees";
import { useGetEmployees } from "@/utils/useGetEmployees";
import FilterForm from "@/components/Form/FilterForm";

const page = () => {
  const { user } = useUserStore();
  const { setEmployees, employees } = useEmployeeStore();
  const { pagination, setPagination, getAllEmployees, getEmployeeAttendances , getEmployeePayments} =
    useGetEmployees();
  //  const [pagination, setPagination] = useState({
  //    current_page: 1,
  //    per_page: 3,
  //    last_page: 1,
  //  });
  const router = useRouter();
  useEffect(() => {
    getAllEmployees();
  }, [user?.accessToken]); 

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  const employeeColumns = [
    {
      name: "Name",
      selector: (row: Employee) => row.name,
      sortable: true,
    },
    {
      name: "Matricule",
      selector: (row: Employee) => row.matricule,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Employee) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Employee) => row.phone,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row: Employee) => row.position,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: Employee) => row.department,
      sortable: true,
    },
    {
      name: "Employment Date",
      selector: (row: Employee) => row.employment_date,
      sortable: true,
    },
    {
      name: "Work Status",
      selector: (row: Employee) => row.work_status,
      sortable: true,
    },
    {
      name: "Total Overtime Hour",
      selector: (row: Employee) => row.total_overtime_hour,
      sortable: true,
    },
    {
      name: "Total Sick Days",
      selector: (row: Employee) => row.total_sick_days,
      sortable: true,
    },
    {
      name: "Total Absences",
      selector: (row: Employee) => row.total_absences,
      sortable: true,
    },
  ];

  const viewEmployeeAtendances = (row: Employee) => {
    getEmployeeAttendances(row.id);
    router.push(`employees/attendances/${row.id}`);
    // Implement the view logic
  };
  const viewEmployeePayments = (row: Employee) => {
    getEmployeePayments(row.id);
    router.push(`employees/payment-summary/${row.id}`);
    // Implement the view logic
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee" />
      <FilterForm />
      <CustomDataTable
        title="Employees Details"
        columns={employeeColumns}
        data={employees}
        // handleView={handleViewEmployee}
        // handleDelete={handleDeleteAdmin}
        // onPageChange={handlePageChange}
        viewAttendances={viewEmployeeAtendances}
        viewPayments={viewEmployeePayments}
        // paginate={{
        //   current_page: pagination.current_page,
        //   last_page: pagination.last_page,
        //   per_page: pagination.per_page,
        //   onPageChange: handlePageChange,
        // }}
        paginate={true}
      />
      <ToastContainer />
    </DefaultLayout>
  );
};

export default page;
