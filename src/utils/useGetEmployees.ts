import { useState } from "react";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useEmployeeStore } from "@/zustand/employees";
import { toast } from "react-toastify";
import { FilterParams } from "./types";
import { useAttendanceStore } from "@/zustand/EmployeeAttendances";
import { usePaymentStore } from "@/zustand/EmployeePayments";
import { monthConversion } from "./monthCoversion";

export const useGetEmployees = () => {
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 3,
    last_page: 1,
  });
  const { user } = useUserStore();
  const { setEmployees, employees } = useEmployeeStore();
const { setAttendances } = useAttendanceStore();
const { setPayments } = usePaymentStore();
  const getAllEmployees = async (filter_params?: FilterParams) => {
    try {
      const response = await API.getAllEmployees(
        user?.accessToken as string,
        pagination.current_page,
        filter_params,
      );
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const employees = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            matricule: item.matricule,
            email: item.email,
            phone: item.phone,
            position: item.position,
            department: item.department.name,
            employment_date: item.employment_date,
            work_status: item.work_status,
            total_overtime_hour: item.total_overtime_hour,
            total_sick_days: item.total_sick_days,
            total_absences: item.total_absences,
          };
        });

        setEmployees(employees);
        setPagination({
          current_page: res.meta.current_page,
          per_page: res.meta.per_page,
          last_page: res.meta.last_page,
        });
        console.log("Employee", employees, data);

        toast.success(res.message);
        //  router.push("/dashboard", { scroll: false });
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const getEmployeeAttendances = async (id: string) => {
    try {
      const response = await API.getEmployeeAttendances(
        id,
        user?.accessToken as string,
      );
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const attendances = data.map((item: any) => {
          return {
            month: monthConversion(item.month),
            days_worked: item.days_worked,
            sick_days: item.sick,
            holidays: item.holidays,
            total_normal_pay_hours: item.total_normal_pay_hours,
            total_overtime_hour: item.total_overtime_hour,
            total_absences: item.total_absences,
          };
        });

        setAttendances(attendances);
        toast.success(res.message);
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const getEmployeePayments = async (id: string) => {
    try {
      const response = await API.getEmployeePayments(
        id,
        user?.accessToken as string,
      );
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const payments = data.map((item: any) => {
          return {
            total_normal_pay_hours: item.total_normal_pay_hours,
            total_overtime: item.total_overtime,
            income_tax: item.income_tax,
            retirement_deduction: item.retirement_deduction,
            overtime_pay: item.overtime_pay,
            house_allowance_pay: item.house_allowance_pay,
            longevity_allowance_pay: item.longevity_allowance_pay,
            leave_pay: item.leave_pay,
            retirement_pay: item.retirement_pay,
            net_pay: item.net_pay,
            gross_pay: item.gross_pay,
            payment: item.payment
          };
        });

        setPayments(payments);

        //    console.log("Employee", employees, data);

        toast.success(res.message);
        //  router.push("/dashboard", { scroll: false });
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return {
    pagination,
    setPagination,
    getAllEmployees,
    getEmployeeAttendances,
    getEmployeePayments,
  };
};
