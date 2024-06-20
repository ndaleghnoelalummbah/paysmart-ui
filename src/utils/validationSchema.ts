import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email().required("Email or phone number is required"),
  password: yup
    .string()
    .min(8, "Password should have atleast 8 characters")
    .required("Password is required"),
});
export const addAdminValidationSchema = yup.object({
  email: yup.string().email().required("Email or phone number is required"),
  password: yup
    .string()
    .min(8, "Password should have atleast 8 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const filterValidationSchema = yup.object({
  matricule: yup.string().optional(),
  position: yup.string().optional(),
  department: yup.string().optional(),
  min_overtime: yup.string().optional(),
  min_absences: yup.string().optional(),
  min_sick_days: yup.string().optional(),
});

export const resetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password should have atleast 8 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});