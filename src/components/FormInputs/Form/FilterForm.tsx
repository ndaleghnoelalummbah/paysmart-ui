import React, { useState } from "react";
import Button from "@/Button/Button";
import { FilterParams } from "@/utils/types";
import { useGetEmployees } from "@/utils/useGetEmployees";
import { filterValidationSchema } from "@/utils/validationSchema";
import { Formik, Form, Field } from "formik";
import { Input } from "../Inputs";
import { useFilterStore } from "@/zustand/employees";

const FilterForm = () => {
  const { getAllEmployees } = useGetEmployees();
  const { setFilterParams } = useFilterStore();
  const [initialValues, setInitialValues] = useState({
    matricule: "",
    position: "",
    department: "",
    min_overtime: "",
    min_absences: "",
    min_sick_days: "",
    page: ""
  });

  const handleSubmit = async (values: FilterParams) => {
   // setInitialValues(values);
   setFilterParams(values);
   values && getAllEmployees(values);
       console.log("filter", values);

  };

  return (
    <div>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={filterValidationSchema}
          onSubmit={(values: FilterParams) => handleSubmit(values)}
        >
          {({ values, isSubmitting }) => (
            <Form className=" mb-4 mt-16 grid gap-x-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
              <Field
                name="matricule"
                labelText="Matricule"
                placeholder="Matricule"
                type="text"
                component={Input}
              />
              <Field
                name="position"
                labelText="Position"
                placeholder="Position"
                component={Input}
                type="text"
              />
              <Field
                name="department"
                labelText="Department"
                placeholder="Department"
                component={Input}
                type="text"
              />
              <Field
                name="min_overtime"
                labelText="Minimum over time"
                placeholder="Min overtime"
                component={Input}
                type="text"
              />
              <Field
                name="min_absences"
                labelText="Minimum absences"
                placeholder="Min absences"
                component={Input}
                type="text"
              />
              <Field
                name="min_sick_days"
                labelText="Minimum sick days"
                placeholder="Min sick days"
                component={Input}
                type="text"
              />

              <div className="mb-6 flex flex-col justify-end">
                <Button
                  text="Search"
                  color="primary"
                  btnType="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};

export default FilterForm;
