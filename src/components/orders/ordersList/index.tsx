import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Order } from "../modal";

type OrderProps = {
  orders: Order[];
};
export default function Orders({ orders }: OrderProps) {
  const { t } = useTranslation(["orders", "translation"]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "_id", headerName: t("order-id"), width: 150 },
    {
      field: "customer.firstName",
      headerName: t("name"),
      width: 200,
      valueGetter: (value, row) =>
        `${row.customer.firstName || "-"} ${row.customer.lastName || "-"} `,
    },
    {
      field: "price",
      headerName: t("price"),
      width: 100,
      sortable: true,
    },
    {
      field: "customer.email",
      headerName: t("email"),
      width: 250,
      valueGetter: (value, row) => `${row.customer.email || "-"} `,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 100,
    },
    {
      field: "orderDate",
      headerName: t("ordered-on"),
      width: 250,
    },
    {
      field: "action",
      headerName: t("action"),
      width: 50,
      renderCell: (params) => (
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            const id = params.row._id;
            navigate(`/app/orders/order/${id}`);
          }}
        />
      ),
    },
  ];

  const getRowId = (row: any) => row._id;

  return (
    <div style={{ marginBottom: "50px" }}>
      <DataGrid
        sx={{
          backgroundColor: "white",
          outline: "none",
        }}
        rows={orders}
        columns={columns}
        getRowId={getRowId}
        disableRowSelectionOnClick
        pagination
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
