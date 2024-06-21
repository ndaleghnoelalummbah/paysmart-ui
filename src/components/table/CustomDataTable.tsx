import Button from "@/Button/Button";
import {
  Admin,
  Employee,
  EmployeePayment,
  MostRecentEmployeePayment,
  YearlyEmployeePaymentSummary,
} from "@/utils/types";
import React, { FC } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RowType = {
  row:
    | Admin
    | Employee
    | EmployeePayment
    | YearlyEmployeePaymentSummary
    | MostRecentEmployeePayment;
};

interface CustomDAtaTableProps {
  title: string;
  columns: any;
  data: any;
  withAction?: boolean;
  pagination?: boolean;
  handleView?: (row: any) => void;
  handleDelete?: (row: any) => void;
  paginate?: any;
  onPageChange?: () => void;
  viewAttendances?: (row: any) => void;
  viewPayments?: (row: any) => void;
  resetPassword?: (row: any) => void;
  handleAddAdmin?: () => void;
}

const CustomDataTable: FC<CustomDAtaTableProps> = ({
  title,
  columns,
  data,
  handleView,
  handleDelete,
  pagination,
  paginate,
  onPageChange,
  viewAttendances,
  viewPayments,
  resetPassword,
  withAction = true,
  handleAddAdmin,
}) => {
  const viewHandler = (row: RowType) => {
    {
      handleView && handleView(row);
    }
  };
  const attendanceHandler = (row: RowType) => {
    {
      viewAttendances && viewAttendances(row);
    }
  };
  const paymentHandler = (row: RowType) => {
    {
      viewPayments && viewPayments(row);
    }
  };
  const deleteHandler = (row: RowType) => {
    {
      handleDelete && handleDelete(row);
    }
  };
  const resetPasswordHandler = (row: RowType) => {
    {
      resetPassword && resetPassword(row);
    }
  };

  const actionsColumn = {
    name: "Actions",
    cell: (row: RowType) => (
      <div className="flex space-x-2">
        {handleView && (
          <button
            onClick={() => viewHandler(row)}
            className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
          >
            View
          </button>
        )}
        {viewAttendances && (
          <button
            onClick={() => attendanceHandler(row)}
            className="mr-2 rounded bg-secondary px-2 py-1 text-white"
          >
            Attendances
          </button>
        )}
        {viewPayments && (
          <button
            onClick={() => paymentHandler(row)}
            className="mr-2 rounded bg-primary px-2 py-1 text-white"
          >
            Payments
          </button>
        )}
        {/* {
          viewAttendances &&
          <Button text={"Attendances"} color={"primary"} btnType={"button"} onClick={viewAttendances} />
        } */}

        {resetPassword && (
          <button
            onClick={() => resetPasswordHandler(row)}
            className="mr-2 rounded bg-secondary px-2 py-1 text-white"
          >
            Reset password
          </button>
        )}
        {handleDelete && (
          <button
            onClick={() => deleteHandler(row)}
            className="mr-2 rounded bg-danger px-2 py-1 font-semibold text-white"
          >
            Delete
          </button>
        )}
      </div>
    ),
    minWidth: "200px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  };

  const columnsWithActions = [...columns, actionsColumn];
  const finalColumns = withAction ? [...columns, actionsColumn] : [...columns];
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
  };

  return (
    <div>
      <DataTable
        title={title}
        columns={finalColumns}
        data={data}
        customStyles={tableHeaderStyle}
        paginationRowsPerPageOptions={[0, paginate && paginate.per_page]}
        onChangePage={onPageChange}
        pagination={pagination}
        paginationServer={true}
        persistTableHead={false}
        paginationTotalRows={paginate && paginate.total}
        highlightOnHover
        actions={handleAddAdmin &&
          <div className="my-8 w-fit">
            <Button
              text="ADD ADMIN"
              color="primary"
              btnType="button"
              onClick={handleAddAdmin}
            />
          </div>
        }
      />
      <ToastContainer />
    </div>
  );
};

export default CustomDataTable;
