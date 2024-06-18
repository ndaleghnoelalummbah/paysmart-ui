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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { name, value, onChange, onBlur } = field;
  const { errors, touched, setFieldTouched } = form;
  const hasError = errors[name] && touched[name];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
        {labelText}
      </label>
      <div className="flex w-full items-center justify-between rounded border-[1.5px] border-stroke bg-transparent bg-white px-2 py-2  text-sm text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
        <input
          type={passwordVisible ? "text" : "password"}
          value={value}
          onChange={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...props}
          className="w-[100%] outline-none "
        />
        {passwordVisible ? (
          <FaEye
            size={20}
            onClick={() => setPasswordVisible((prev) => !prev)}
          />
        ) : (
          <FaEyeSlash
            size={20}
            onClick={() => setPasswordVisible((prev) => !prev)}
          />
        )}
      </div>
      {hasError && (
        <p className=" mb-2 mt-2 text-rose-400">{errors[name] as string}</p>
      )}
    </div>
  );
};
