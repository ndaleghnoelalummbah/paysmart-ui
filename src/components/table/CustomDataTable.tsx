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
  paginate?: boolean;
  handleView?: (row: any) => void;
  handleDelete?: (row: any) => void;
  // paginate;
  onPageChange?: () => void;
  viewAttendances?: (row: any) => void;
  viewPayments?: (row: any) => void;
}

const CustomDataTable: FC<CustomDAtaTableProps> = ({
  title,
  columns,
  data,
  handleView,
  handleDelete,
  paginate,
  onPageChange,
  viewAttendances,
  viewPayments,
  withAction = true
}) => {
  const viewHandler = (row:RowType) => {
   {handleView && handleView(row);}
  };
  const attendanceHandler = (row: RowType) => {
   {viewAttendances && viewAttendances(row);}
  };
  const paymentHandler = (row: RowType) => {
   {viewPayments && viewPayments(row);}
  };
  const deleteHandler = (row: RowType) => {
    {
      handleDelete && handleDelete(row);
    }
  };

  const actionsColumn = {
    name: "Actions",
    cell: (row: RowType) => (
      <div className="flex space-x-2">
       {handleView && <button
          onClick={() => viewHandler(row)}
          className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
        >
          View
        </button>}
       {viewAttendances && <button
          onClick={() => attendanceHandler(row)}
          className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
        >
          Attendances
        </button>}
       {viewPayments && <button
          onClick={() => paymentHandler(row)}
          className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
        >
          Payments
        </button>}
        {/* {
          viewAttendances &&
          <Button text={"Attendances"} color={"primary"} btnType={"button"} onClick={viewAttendances} />
        } */}
       {handleDelete && <button
          onClick={() => deleteHandler(row)}
          className="mr-2 rounded bg-danger px-2 py-1 font-semibold text-white"
        >
          Delete
        </button>}
      </div>
    ),
    minWidth: "200px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  };

  const columnsWithActions = [...columns, actionsColumn];
  const finalColumns = withAction
    ? [...columns, actionsColumn]
    : [...columns];

  return (
    <div>
      <DataTable
        title={title}
        columns={finalColumns}
        data={data}
        //paginationRowsPerPageOptions={[paginate.per_page, 6]}
        onChangePage={onPageChange}
        // pagination
        pagination={paginate}
        paginationServer={true}
        persistTableHead={false}
        paginationTotalRows={5}
        // paginationComponentOptions={paginate}
        highlightOnHover
        actions={
          <div className="my-8 w-fit">
            <Button text={"Export PDF"} color={"primary"} btnType={"button"} />
          </div>
        }
      />
      <ToastContainer />
    </div>
  );
};

export default CustomDataTable;
