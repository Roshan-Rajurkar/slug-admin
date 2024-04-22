import { useState } from "react";
import ProductCard from "../../../common/components/productCard";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ImportExportOutlined } from "@mui/icons-material";
import { useGetAllProducts } from "../service";
import { Product } from "../modals";
import FullScreenLoader from "../../../common/components/fullscreenloader";

const ProductList = () => {
  const { t } = useTranslation("products");

  const { data: products, isLoading } = useGetAllProducts();
  console.log(products);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(products?.length / itemsPerPage)),
    );
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <Box
      sx={{
        marginTop: 0.5,
        borderRadius: 0,
        // borderTop: 1,
        borderColor: "#E0E0E0",
        paddingX: 8,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}
      >
        <Typography variant="h6" align="center" mb={1.5}>
          {products?.length === 0 ? t("no-products") : t("available-products")}
        </Typography>

        <Box>
          {/* <Button >Category</Button> */}

          <Button
            sx={{ backgroundColor: "#fff", color: "#949494" }}
            startIcon={<ImportExportOutlined />}
          >
            {t("latest-added")}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "start",
        }}
      >
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Box>

      {products?.length > 10 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 1.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            sx={{
              paddingX: 0,
            }}
            variant="contained"
          >
            {page}
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextPage}
            disabled={endIndex >= products?.length}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
