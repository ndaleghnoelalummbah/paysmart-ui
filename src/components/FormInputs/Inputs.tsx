import React, { useState } from 'react';


import { FieldProps } from "formik";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
      //  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 text-sm  bg-white text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        className="w-full rounded border border-stroke bg-transparent py-2 px-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {hasError && (
        <p className=" mb-2 mt-2 text-rose-400">{errors[name] as string}</p>
      )}
    </div>
  );
};

export const PasswordInput: React.FC<InputProps> = ({
  field,
  form,
  labelText,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { name, value, onChange, onBlur } = field;
  const { errors, touched, setFieldTouched } = form;
  const hasError = errors[name] && touched[name];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
        {labelText}
      </label>
      <div
        className="relative"
        // className="flex w-full items-center justify-between rounded border border-stroke bg-transparent bg-white px-2 py-2  text-sm text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <input
          type={passwordVisible ? "text" : "password"}
          value={value}
          onChange={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...props}
          // className="w-[100%] outline-none "
          className="w-full rounded-lg border border-stroke bg-transparent px-2 py-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {passwordVisible ? (
          <FaEyeSlash
            size={20}
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute right-4 top-3"
          />
        ) : (
          <FaEye
            size={20}
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute right-4 top-3"
          />
        )}
      </div>
      {hasError && (
        <p className=" mb-2 mt-2 text-rose-400">{errors[name] as string}</p>
      )}
    </div>
  );
};
