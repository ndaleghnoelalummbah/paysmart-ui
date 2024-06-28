import Button from "@/Button/Button";
import { Admin } from "@/utils/types";
import { resetPasswordValidationSchema } from "@/utils/validationSchema";
import { Formik, Form, Field } from "formik";
import React from "react";
import { PasswordInput } from "../FormInputs/Inputs";
import useAuth from "@/utils/useAuth";
function PasswordResetModal(props: any) {
  const { setShowPasswordResetModal, selectedAdmin } = props;
  const { resetPassword } = useAuth();
  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const handleSubmit = async (values: Partial<Admin>) => {
    if(selectedAdmin){
        resetPassword(selectedAdmin.id, values);
    }
  };
 
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className=" dark:bg-gray-800 w-11/12 max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
        <h2 className="mb-12 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Change Admin Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={(values: Partial<Admin>) => handleSubmit(values)}
        >
          {({ isSubmitting }) => (
            <div className=" mt-4 text-left">
              <Form>
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

                <div className=" flex justify-between gap-x-8">
                  <Button
                    text="Cancel"
                    color="gray"
                    btnType="button"
                    onClick={() =>
                      setShowPasswordResetModal((prev: boolean) => !prev)
                    }
                  />
                  <Button
                    text="Submit"
                    color="primary"
                    btnType="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PasswordResetModal;
