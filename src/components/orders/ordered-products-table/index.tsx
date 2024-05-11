import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
  },
  { field: "price", headerName: "Price", width: 120 },
  {
    field: "total",
    headerName: "Total",
    width: 120,
  },
];

export default function ProductTable({ products }: any) {
  const rows = products.map((product: any) => ({
    ...product,
    total: product.price,
    quantity: products.length,
  }));

  const getRowId = (row: any) => row._id;

  return (
    <div style={{ height: 200, width: "60%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        getRowId={getRowId}
        hideFooter={true}
        hideFooterPagination={true}
      />
    </div>
  );
}
