"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import AnualSummaryReport from "@/components/Reports/AnualSummaryReport";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports" />
      <AnualSummaryReport />
    </DefaultLayout>
  );
};

export default page;
