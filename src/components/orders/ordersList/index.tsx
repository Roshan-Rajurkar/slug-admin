import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MockOrdersData } from "../../dashboard/mock";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
// import { Box } from "@mui/material";

export default function Orders() {
  const { t } = useTranslation(["orders", "translation"]);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    // {
    //   field: "_",
    //   headerName: t("product"),
    //   width: 100,
    //   renderCell: (params) => (
    //     <Box
    //       sx={{
    //         width: "50px",
    //         height: "35px",
    //         padding: 1,
    //       }}
    //     >
    //       <img
    //         width="100%"
    //         height="100%"
    //         src="https://assets.turbologo.com/blog/en/2021/09/10093610/photo-camera-958x575.png"
    //         alt="product"
    //       />
    //     </Box>
    //   ),
    // },
    { field: "order_id", headerName: t("order-id"), width: 150 },
    { field: "name", headerName: t("name"), width: 150 },
    {
      field: "amount",
      headerName: t("amount"),
      width: 100,
      sortable: true,
    },
    {
      field: "email",
      headerName: t("email"),
      width: 250,
    },
    {
      field: "order_status",
      headerName: t("status"),
      width: 100,
    },
    {
      field: "date",
      headerName: t("ordered-on"),
      width: 200,
    },
    {
      field: "id",
      headerName: t("action"),
      width: 100,
      renderCell: (params) => (
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            const id = params.id;
            navigate(`${id}`);
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ marginBottom: "50px" }}>
      <DataGrid
        sx={{
          backgroundColor: "white",
          outline: "none",
        }}
        rows={MockOrdersData}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 6 } },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
