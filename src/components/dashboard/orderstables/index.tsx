import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MockOrdersData } from "../mock";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const columns: GridColDef[] = [
  { field: "order_id", headerName: "Order ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    sortable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "order_status",
    headerName: "Status",
    width: 140,
  },
  {
    field: "date",
    headerName: "Order date",
    width: 200,
  },
];

export default function OrdersTable() {
  const { t } = useTranslation("dashboard");

  return (
    <div style={{ height: 500, width: "100%", marginBottom: "50px" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#565656",
          backgroundColor: "white",
          padding: 2,
        }}
      >
        {t("latest-orders")}
      </Typography>
      <DataGrid
        sx={{
          backgroundColor: "white",
          outline: "none",
        }}
        rows={MockOrdersData}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter={true}
      />
    </div>
  );
}
