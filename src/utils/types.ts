
export type FetchHeaderType = {
  Authorization: string;
  "Content-Type": string;
  Accept: string;
};

export interface Admin {
  id?: number;
  email: string;
  password?: string;
  password_confirmation?: string;
  accessToken?: string;
}
export interface Department {
  id: number;
  name: string;
}

export interface Payment {
  id: number;
  admin_id: number;
  is_effected: boolean;
  payment_date: string;
  payslip_issue_date: string;
}
export interface Employee {
  id: string;
  name: string;
  matricule: string;
  email: string;
  phone: string;
  position: string;
  employment_date: string;
  work_status: string;
  hourly_income: number;
  hourly_overtime_pay: number;
  housing_allowance: number;
  department: string;
  total_overtime_hour: string;
  total_sick_days: string;
  total_absences: string;
}
export interface PaginatedEmployees {
  employees: Employee[]  
  current_page: number;
  last_page: number;
  per_page: number;
  total:number;
}
export interface Attendance {
  month: string;
  total_normal_pay_hours: number;
  total_overtime_hour: number;
  days_worked: number;
  sick_days: number;
  holidays: number;
  total_absences: number;
  // employee: Employee;
}

export interface YearlyEmployeePaymentSummary {
  total_income_tax: number;
  total_overtime: number;
  total_normal_pay_hours: number;
  total_overtime_pay: number;
  total_net_pay: number;
  total_gross_pay: number;
  total_house_allowance_pay: number;
  total_longevity_allowance_pay: number;
  total_retirement_deduction: number;
  total_leave_pay: number;
  total_retirement_pay: number;
  payment: Payment;
}

export interface MostRecentEmployeePayment {
  total_income_tax: number;
  total_overtime: number;
  total_normal_pay_hours: number;
  total_overtime_pay: number;
  total_net_pay: number;
  total_gross_pay: number;
  total_house_allowance_pay: number;
  total_longevity_allowance_pay: number;
  total_retirement_deduction: number;
  total_leave_pay: number;
  total_retirement_pay: number;
  total_employees_worked: number;
  total_employees_on_leave: number;
  total_employees_on_retirement: number;
  pending_pay: number;
  payment: Payment;
}

export interface EmployeePayment {
  income_tax: number;
  total_overtime: number;
  total_normal_pay_hours: number;
  overtime_pay: number;
  net_pay: number;
  gross_pay: number;
  house_allowance_pay: number;
  longevity_allowance_pay: number;
  retirement_deduction: number;
  leave_pay: number;
  retirement_pay: number;
  admin: number;
  payment: Payment;
}
export interface PaginatedExtraDataEntity {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: 20;
  prev_page_url?: null;
  to?: 20;
  total?: 3236;
}
export interface FilterParams {
  matricule: string;
  position: string;
  department: string;
  min_overtime: string;
  min_absences: string;
  min_sick_days: string;
}