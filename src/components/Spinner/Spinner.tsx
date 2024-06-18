"use client";
import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <ColorRing
      visible={true}
      height="25"
      width="42"
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
    />
  );
};

export default Spinner;
