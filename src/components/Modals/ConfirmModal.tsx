import Button from "@/Button/Button";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const ConfirmModal = (props: any) => {
  const {
    cancelDelete,
    confirmDelete,
    show,
    text,
    initiatePayment,
    makePayment,
    initiatingPay,
    makingPay
  } = props;

  const escFunction = useCallback((event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      // User for Close the modal on Escape
      cancelDelete(false);
    }
  }, []);
  

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  const confirmAction = confirmDelete ? confirmDelete : initiatePayment ? initiatePayment : makePayment;
  const confirmText = confirmDelete ? 'Delete' : initiatePayment ? 'Initiate Payment ' : 'Make Payment'
  const color = confirmDelete ? 'danger' : 'primary'

  return (
    <SweetAlert
      custom
      show={show}
      title="Are you sure?"

      customButtons={
        <div className=" flex w-full items-center gap-x-4 md:w-[80%]">
          <Button
            text="Cancel"
            color="gray"
            btnType={"button"}
            onClick={cancelDelete}
          />
          <Button
            text={confirmText}
            color={color}
            btnType={"button"}
            disabled={initiatingPay || makingPay}
            onClick={confirmAction}
          />
        </div>
      }
      customIcon={
        confirmDelete ? (
          <Image
            src={"/images/icons/remove.jpg"}
            width={100}
            height={100}
            alt="warning icon"
            className=" mx-auto mb-3"
          />
        ) : (
          <Image
            src={"/images/icons/warning.png"}
            width={180}
            height={100}
            alt="warning icon"
            className=" mx-auto mb-3"
          />
        )
      }
    >
      <span className="text-black">{text}</span>
    </SweetAlert>
  );
};
export default ConfirmModal;

