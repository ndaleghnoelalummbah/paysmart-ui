"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import AnualSummaryReport from "@/components/Reports/AnualSummaryReport";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Reports | PaySmart - Payroll Management",
//   description: "Generate and view payroll reports for the organization.",
// };

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reports" />
      <AnualSummaryReport />
    </DefaultLayout>
  );
};

export default page;
