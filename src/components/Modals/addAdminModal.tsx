import Button from "@/Button/Button";
import { Admin } from "@/utils/types";
import {
  addAdminValidationSchema,
} from "@/utils/validationSchema";
import { Formik, Form, Field } from "formik";
import React, { FC } from "react";
import { Input, PasswordInput } from "../FormInputs/Inputs";
import useGetAdmins from "@/utils/useGetAdmins";

interface AddAdminModalProps {
  setShowAddAdminModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAdminModal: FC<AddAdminModalProps> = ({ setShowAddAdminModal }) => {
  const { addNewAdmin } = useGetAdmins();
  const initialValues = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const handleSubmit = async (values: Admin) => {
    addNewAdmin(values);
    setShowAddAdminModal(false);
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 ">
      <div className=" dark:bg-gray-800 w-11/12 max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
        <h2 className="mb-12 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Add New Admin
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addAdminValidationSchema}
          onSubmit={(values: Admin) => handleSubmit(values)}
        >
          {({ isSubmitting }) => (
            <div className=" mt-4 text-left">
              <Field
                name="email"
                labelText="Enter your email"
                component={Input}
                type="email"
              />
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
                    onClick={() => setShowAddAdminModal((prev) => !prev)}
                  />
                  <Button
                    text="Add"
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
};

export default AddAdminModal;
