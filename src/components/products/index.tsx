import React, { Suspense, useState } from "react";
import {
  Navigate,
  Outlet,
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import { Box, Button, Grid, Typography } from "@mui/material";
import ProductsSideNav from "../../common/components/sidesubnavigation";
import { NavigationType } from "../../common/modals";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useTranslation } from "react-i18next";
import ProductList from "./productslist";
import AddProduct from "./add-edit-product";
import { useGetAllProducts } from "./service";
import csvDownload from "json-to-csv-export";

const Layout = () => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const location = useLocation();

  const { data: jsonProductsData, isLoading } = useGetAllProducts();

  const dataToConvert = {
    data: jsonProductsData,
    filename: "products-report",
    delimiter: ",",
  };

  const [navigationItems, setNavigationItems] = useState<NavigationType[]>([
    {
      name: t("products-list"),
      href: "products_list",
      active: true,
      icon: "",
    },
    {
      name: t("add-product"),
      href: "add_product",
      active: false,
      icon: "",
    },
    // {
    //   name: t("category"),
    //   href: "add_product",
    //   active: false,
    //   icon: "",
    // },
  ]);

  const handleNavigationClick = (index: number) => {
    const updatedNavigationItems = navigationItems.map((item, i) => ({
      ...item,
      active: i === index,
    }));
    setNavigationItems(updatedNavigationItems);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            marginBottom: 2,
            fontWeight: "bolder",
            color: "#1C1C1C",
          }}
        >
          {t("products-grid")}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            endIcon={<UploadFileRoundedIcon />}
            sx={{
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              alignItems: "center",
              visibility:
                location.pathname.split("/")[3] === "add_product"
                  ? "hidden"
                  : "",
            }}
            disabled={isLoading}
            onClick={() => {
              if (jsonProductsData) csvDownload(dataToConvert);
            }}
          >
            {t("export")}
          </Button>
          <Button
            endIcon={<AddCircleOutlineRoundedIcon />}
            sx={{
              backgroundColor: "#0000FF",
              color: "white",
              "&:hover": {
                backgroundColor: "#2196f3",
              },
              paddingY: 1,
              alignItems: "center",
              visibility:
                location.pathname.split("/")[3] === "add_product"
                  ? "hidden"
                  : "",
            }}
            onClick={() => navigate("/app/products/add_product")}
          >
            {t("add-product")}
          </Button>
        </Box>
      </Box>
      {/* <Box sx={{ display: "flex", gap: 2 }}> */}
      <Grid container justifyContent="space-around">
        <Grid item xs={1}>
          <ProductsSideNav
            navigation={navigationItems}
            onNavigationClick={handleNavigationClick}
          />
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

const Products = () => {
  const routes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="products_list" replace />,
      },

      {
        path: "products_list",
        element: <ProductList />,
      },

      {
        path: "add_product",
        element: <AddProduct />,
      },

      {
        path: "edit_product/:id",
        element: <AddProduct />,
      },

      {
        path: "*",
        element: <Navigate to="products_list" replace />,
      },
    ],
  };

  const routing = useRoutes([routes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default Products;
