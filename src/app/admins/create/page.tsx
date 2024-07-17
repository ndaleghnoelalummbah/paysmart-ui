"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { useUserStore, useAdminsStore } from "@/zustand/Admin";
import Button from "@/Button/Button";
import { Input, PasswordInput } from "@/components/FormInputs/Inputs";
import { Admin } from "@/utils/types";
import { addAdminValidationSchema } from "@/utils/validationSchema";
import { Formik, Form, Field } from "formik";
import { API } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const { addAdmin, admins } = useAdminsStore();
  console.log("user", user);
  const initialValues = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const handleSubmit = async (values: Admin) => {
    try {
      const response = await API.createAdmin(
        values,
        user?.accessToken as string,
      );
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const user = res.data.admin;
        const admin = {
          id: user.id,
          email: user.email,
        };
        // AsyncStorage.setItem("token", res.data.user.accessToken);
        addAdmin(admin);
        toast.success(res.message);

        console.log("new admisns", values, admins);
        router.push("/admins");
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Admin" />
      <div className=" w-11/12 max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={addAdminValidationSchema}
          onSubmit={(values: Admin) => handleSubmit(values)}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field
                name="email"
                labelText="Enter your email"
                component={Input}
                type="email"
              />
              <Field
                name="password"
                labelText="Enter your password"
                component={PasswordInput}
              />
              <Field
                name="password_confirmation"
                labelText="Re-type your password"
                component={PasswordInput}
              />

              <Button
                text="ADD"
                color="primary"
                btnType="submit"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default Page;
