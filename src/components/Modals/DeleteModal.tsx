import React, { useCallback, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import remove from "../../../public/images/icons/remove.jpg";

const DeleteModal = (props: any) => {
  const { cancelDelete, confirmDelete, show } = props;

  const escFunction = useCallback((event) => {
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

  return (
    <SweetAlert
      custom
      show={show}
      confirmBtnBsStyle="mr-2 rounded bg-danger px-2 py-1 text-white font-semibold"
      cancelBtnBsStyle="mr-2 rounded bg-body px-2 py-1 text-white font-semibold"
      confirmBtnText="Delete"
      cancelBtnText="Cancel"
      title="Are you sure?"
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
      showCancel
      focusCancelBtn
      customIcon={
        "https://img.freepik.com/premium-vector/red-cross-mark-icon-negative-choice-symbol-sign-app-button_744955-339.jpg?w=360"
      }
    >
      <span className="text-black">
        You will not be able to recover this Admin once deleted.!
      </span>
    </SweetAlert>
  );
};
export default DeleteModal;

