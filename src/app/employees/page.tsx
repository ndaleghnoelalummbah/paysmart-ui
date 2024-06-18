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
import Button from "@/Button/Button";
import { useEmployeeStore } from "@/zustand/employees";
import { useGetEmployees } from "@/utils/useGetEmployees";
import FilterForm from "@/components/FormInputs/Form/FilterForm";

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

  // const getAllEmployees = async (page: number) => {
  //   try {
  //     const response = await API.getAllEmployees(user?.accessToken as string, page);
  //     console.log("response", response);
  //     const statusCode = response[0];
  //     const res = await response[1];
  //     const status = response[2];

  //     if (status) {
  //       const data = res.data;
  //       const employees = data.map((item: any) => {
  //         return {
  //           id: item.id,
  //           name: item.name,
  //           matricule: item.matricule,
  //           email: item.email,
  //           phone: item.phone,
  //           position: item.position,
  //           department: item.department.name,
  //           employment_date: item.employment_date,
  //           work_status: item.work_status,
  //           total_overtime_hour: item.total_overtime_hour,
  //           total_sick_days: item.total_sick_days,
  //           total_absences: item.total_absences,
  //         };
  //       });

  //       setEmployees(employees);
  //        setPagination({
  //          current_page: res.meta.current_page,
  //          per_page: res.meta.per_page,
  //          last_page: res.meta.last_page,
  //        });
  //       console.log("Employee", employees, data);

  //       toast.success(res.message);
  //       //  router.push("/dashboard", { scroll: false });
  //     } else {
  //       const message =
  //         statusCode === 500
  //           ? "Oops! Something went wrong on our end. Please try again later."
  //           : res.message;
  //       toast.error(message);
  //     }
  //   } catch (error) {
  //     toast.error(error as string);
  //   }
  // };

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

  const handleViewEmployee = (row: Employee) => {
    router.push(`employees/${row.id}`);
    // Implement the view logic
  };

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

  const handleDeleteAdmin = (row: Employee) => {
    console.log("Deleting admin", row);

    // Implement the delete logic
  };

  const handleClick = () => {
    router.push("Employee/create");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee" />
      <div className="my-8 flex flex-row justify-end">
        <div className=" w-fit">
          <Button
            text="ADD ADMIN"
            color="primary"
            btnType="button"
            onClick={handleClick}
          />
        </div>
      </div>
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
