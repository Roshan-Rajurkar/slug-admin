import React, { useState } from "react";
import ProductCard from "../../../common/components/productCard";
import mockProducts from "../mock";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { t } = useTranslation("products");

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(mockProducts.length / itemsPerPage)),
    );
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="h6" align="center" mb={2}>
        {t("available-products")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {mockProducts.slice(startIndex, endIndex).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Box>

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
          disabled={endIndex >= mockProducts.length}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProductList;
