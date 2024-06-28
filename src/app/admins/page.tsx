"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import { useRouter } from "next/navigation";
import { Admin } from "@/utils/types";
import { API } from "@/utils/fetcher";
import { useUserStore, useAdminsStore } from "@/zustand/Admin";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import Button from "@/Button/Button";
import PasswordResetModal from "@/components/Modals/PasswordResetModal";
import useGetAdmins from "@/utils/useGetAdmins";
import { Metadata } from "next";
import AddAdminModal from "@/components/Modals/addAdminModal";

// export const metadata: Metadata = {
//   title: "Admins | PaySmart - Payroll Management",
//   description:
//     "Manage and view all admin users in the organization.",
// };

const page = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const { user } = useUserStore();
  const { admins, removeAdmin } = useAdminsStore();
  const { getAdmins } = useGetAdmins();
  const router = useRouter();

  useEffect(() => {
    getAdmins();
  }, [user?.accessToken]);

  const adminColumns = [
    {
      name: "Email",
      selector: (row: Admin) => row.email,
      sortable: true,
    },
  ];

  const handleDeleteAdmin = (row: Admin) => {
    console.log("Deleting admin", row);
    setSelectedAdmin(row);
    setShowDeleteModal(true);
    // Implement the delete logic
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    //  alert('hidfr')
  };
  const confirmDelete = async () => {
    if (selectedAdmin) {
      try {
        const response = await API.deleteAdmin(
          user?.accessToken as string,
          selectedAdmin.id?.toString() as string,
        );
        const statusCode = response[0];
        const res = await response[1];
        const status = response[2];

        console.log("delete response", response);
        if (status) {
          toast.success(res.message);
          removeAdmin(selectedAdmin.id as number);
        } else {
          const message =
            statusCode === 500
              ? "Oops! Something went wrong on our end. Please try again later."
              : res.message;
          toast.error(message);
        }
        setShowDeleteModal(false);
      } catch (error) {
        toast.error(error as string);
      }
    }

    setShowDeleteModal(false);
  };

  const handleAddAdmin = () => {
    // router.push("admins/create");
    setShowAddAdminModal(true);
  };


    const handlResetPassword = (row: Admin) => {
     setSelectedAdmin(row);
      setShowPasswordResetModal(true);
      // Implement the delete logic
    };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admins" />
      {/* <div className="flex, float-end mb-12 ">
        <Button
          text="ADD ADMIN"
          color="primary"
          btnType="button"
          onClick={handleClick}
        />
      </div> */}
      <CustomDataTable
        title="Admin Records"
        columns={adminColumns}
        data={admins}
        handleAddAdmin={handleAddAdmin}
        handleDelete={handleDeleteAdmin}
        resetPassword={handlResetPassword}
        pagination={false}
      />
      <ConfirmModal
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        show={showDeleteModal}
        text="You will not be able to recover this Admin once deleted.!"
        // name={selectedAdmin?.email}
      />
      {showPasswordResetModal && (
        <PasswordResetModal
          setShowPasswordResetModal={setShowPasswordResetModal}
          selectedAdmin={selectedAdmin}
        />
      )}
      {showAddAdminModal && (
        <AddAdminModal setShowAddAdminModal={setShowAddAdminModal} />
      )}
    </DefaultLayout>
  );
};

export default page;
