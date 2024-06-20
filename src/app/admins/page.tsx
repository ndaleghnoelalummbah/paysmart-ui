"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDataTable from "@/components/table/CustomDataTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Admin } from "@/utils/types";
import { API } from "@/utils/fetcher";
import { useUserStore, useAdminsStore } from "@/zustand/Admin";
import { toast } from "react-toastify";
import DeleteModal from "@/components/Modals/DeleteModal";
import Button from "@/Button/Button";
import PasswordResetModal from "@/components/Modals/PasswordResetModal";
import useAuth from "@/utils/useAuth";

const page = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const { user } = useUserStore();
  const { setAdmins, admins, removeAdmin } = useAdminsStore();
  const { resetPassword } = useAuth();
  const router = useRouter();
  useEffect(() => {
    getAdmins();
  }, [user?.accessToken]);

  const getAdmins = async () => {
    try {
      const response = await API.getAllAdmins(user?.accessToken as string);
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const admins = data.map((item: any) => {
          return {
            id: item.admin.id,
            email: item.admin.email,
          };
        });

        setAdmins(admins);
        console.log("admins", admins, data);

        toast.success(res.message);
        //  router.push("/dashboard", { scroll: false });
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
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

  const handleClick = () => {
    router.push("admins/create");
  };


    const handlResetPassword = (row: Admin) => {
     setSelectedAdmin(row);
      setShowPasswordResetModal(true);
      // Implement the delete logic
    };

   

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admins" />
      <div className="flex, float-end mb-12 ">
        <Button
          text="ADD ADMIN"
          color="primary"
          btnType="button"
          onClick={handleClick}
        />
      </div>
      <CustomDataTable
        title="Admin Records"
        columns={adminColumns}
        data={admins}
        // handleView={handleViewAdmin}
        handleDelete={handleDeleteAdmin}
        resetPassword={handlResetPassword}
        paginate={false}
      />
      <DeleteModal
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        show={showDeleteModal}
        // name={selectedAdmin?.email}
      />
      {showPasswordResetModal && (
        <PasswordResetModal
          setShowPasswordResetModal={setShowPasswordResetModal}
          selectedAdmin={selectedAdmin}
        />
      )}
    </DefaultLayout>
  );
};

export default page;
