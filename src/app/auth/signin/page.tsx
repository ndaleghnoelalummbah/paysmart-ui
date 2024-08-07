"use client";
import React, { useState } from "react";
// import { Metadata } from "next";
import { Field, Form, Formik, setNestedObjectValues } from "formik";
import { Input, PasswordInput } from "@/components/FormInputs/Inputs";
import { Admin } from "@/utils/types";
import { loginValidationSchema } from "@/utils/validationSchema";
import Button from "@/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { API } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/zustand/Admin";

const Page: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const initialValues: Admin = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values: Admin) => {
    console.log("values", values);
    try {
      const response = await API.signIn(values);
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const user = res.data.admin;
        const admin = {
          id: user.id,
          accessToken: res.header.accessToken,
          email: user.email,
          is_super_admin: user.is_super_admin,
        };
        // AsyncStorage.setItem("token", res.data.user.accessToken);
        setUser(admin);

        toast.success(res.message);
        router.push("/dashboard", { scroll: false });
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
    <div className="bg-custom-image h-[100vh] bg-black  bg-opacity-25 bg-cover bg-center bg-no-repeat">
      <div className=" w-full flex h-full items-center justify-center bg-black bg-opacity-25">
        <div className="w-2/3 items-center bg-white p-12  shadow-normal lg:w-2/5">
          <h2 className="mb-12 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Sign In
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
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
                <Button
                  text="LOGIN"
                  color="primary"
                  btnType="submit"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Page;
