import React from "react";
import ProductCard from "../../../common/components/productCard";
import mockProducts from "../mock";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { t } = useTranslation("products");
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5" align="center" mb={2}>
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
        {mockProducts.slice(0, 10).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 3,
        }}
      >
        <Button>Prev</Button>
        <Button>1</Button>
        <Button>Next</Button>
      </Box>
    </Box>
  );
};

export default ProductList;
