import { useState } from "react";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useEmployeeStore, usePaginatedDataStore } from "../zustand/Employees";
import { toast } from "react-toastify";
import { FilterParams } from "./types";
import { useAttendanceStore } from "@/zustand/EmployeeAttendances";
import { usePaymentStore } from "@/zustand/EmployeePayments";
import { monthConversion } from "./monthCoversion";

export const useGetEmployees = () => {
  // const [paginate, setPaginate] = useState({
  //   current_page: 1,
  //   per_page: 1,
  //   last_page: 1,
  //   total: 1,
  // });

  const { setPaginatedData } = usePaginatedDataStore();
  const { user } = useUserStore();
  const { setEmployees } = useEmployeeStore();
  const { setAttendances } = useAttendanceStore();
  const { setPayments } = usePaymentStore();

  const getAllEmployees = async (filter_params?: FilterParams) => {
    // const curr_page = page ? page : paginate.current_page;
    try {
      const response = await API.getAllEmployees(
        user?.accessToken as string,
        // page as number,
        filter_params as FilterParams,
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

        const paginatedData = res.meta && {
          current_page: res.meta.current_page,
          per_page: res.meta.per_page,
          last_page: res.meta.last_page,
          total: res.meta.total,
        };
        setPaginatedData(paginatedData);
        toast.info(res.message);
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
            employee_cnps_contribution: item.employee_cnps_contribution,
            employer_cnps_contribution: item.employer_cnps_contribution,
            overtime_pay: item.overtime_pay,
            house_allowance_pay: item.house_allowance_pay,
            longevity_allowance_pay: item.longevity_allowance_pay,
            leave_pay: item.leave_pay,
            // retirement_pay: item.retirement_pay,
            net_pay: item.net_pay,
            gross_pay: item.gross_pay,
            payment: item.payment,
          };
        });
        setPayments(payments);
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

  return {
    // paginate,
    // setPaginate,
    getAllEmployees,
    getEmployeeAttendances,
    getEmployeePayments,
  };
};
