import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetOrders } from "../../orders/services";
import FullScreenLoader from "../../../common/components/fullscreenloader";

export default function OrdersTable() {
  const { t } = useTranslation(["dashboard", "orders"]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: t("order-id", { ns: "orders" }), width: 150 },
    {
      field: "customer.firstName",
      headerName: t("name", { ns: "orders" }),
      width: 200,
      valueGetter: (value, row) =>
        `${row.customer.firstName || "-"} ${row.customer.lastName || "-"} `,
    },
    {
      field: "price",
      headerName: t("price", { ns: "orders" }),
      width: 100,
      sortable: true,
    },
    {
      field: "customer.email",
      headerName: t("email", { ns: "orders" }),
      width: 250,
      valueGetter: (value, row) => `${row.customer.email || "-"} `,
    },
    {
      field: "status",
      headerName: t("status", { ns: "orders" }),
      width: 100,
    },
    {
      field: "orderDate",
      headerName: t("ordered-on", { ns: "orders" }),
      width: 250,
    },
  ];

  const { data: orders, isLoading: isOrdersLoading } = useGetOrders();

  const getRowId = (row: any) => row._id;

  if (isOrdersLoading) return <FullScreenLoader />;

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
        rows={orders.slice(0, 5)}
        columns={columns}
        getRowId={getRowId}
        disableRowSelectionOnClick
        hideFooter={true}
      />
    </div>
  );
}
