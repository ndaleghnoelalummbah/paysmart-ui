import React from 'react';


import { FieldProps } from "formik";

interface InputProps extends FieldProps {
  labelText: string;
  type?: 'email' | 'text'
}

export const Input: React.FC<InputProps> = ({
  field,
  form,
  labelText,
  type,
  ...props
}) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched, setFieldTouched } = form;
  const hasError = errors[name] && touched[name];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        onChange={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
       {...props}
        //  placeholderTextColor={colors.dark}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 text-sm  bg-white text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      
      />
      {hasError && <p className=" text-rose-400 mt-2 mb-2">{errors[name] as string}</p>}
    </div>
  );
};


export const PasswordInput: React.FC<InputProps> = ({
  field,
  form,
  labelText,
  ...props
}) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched, setFieldTouched } = form;
  const hasError = errors[name] && touched[name];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
        {labelText}
      </label>
      <input
        type="password"
        value={value}
        onChange={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...props}
        //  placeholderTextColor={colors.dark}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 text-sm  bg-white text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {hasError && <p className=" text-rose-400 mt-2 mb-2">{errors[name] as string}</p>}
    </div>
  );
};
