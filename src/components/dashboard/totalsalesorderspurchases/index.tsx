import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ShoppingCart, ShoppingBasket } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useTranslation } from "react-i18next";

const TotalSalesOrdersPurchases = () => {
  const { t } = useTranslation("dashboard");
  return (
    <>
      <Grid item xs={4}>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
            backgroundColor: "white",
            padding: 2,
            gap: 1,
            flex: 1,
            borderRadius: 2,
          }}
        >
          <AttachMoneyIcon
            sx={{
              width: 40,
              height: 40,
              color: "white",
              background: "#FE9215",
              borderRadius: "50%",
              padding: 1,
              border: "10px solid rgb(254,244,234)",
            }}
          />
          <Box>
            <Typography sx={{ color: "#D5D5D5", fontWeight: "semibold" }}>
              {t("total-sales")}
            </Typography>
            <Typography sx={{ fontWeight: "bolder", fontSize: 24 }}>
              ₹22,303
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
            backgroundColor: "white",
            padding: 2,
            gap: 1,
            flex: 1,
            borderRadius: 2,
          }}
        >
          <ShoppingCart
            sx={{
              width: 40,
              height: 40,
              color: "white",
              background: "#02B718",
              borderRadius: "50%",
              padding: 1,
              border: "10px solid rgb(228,247,227)",
            }}
          />
          <Box>
            <Typography sx={{ color: "#D5D5D5", fontWeight: "semibold" }}>
              {t("total-orders")}
            </Typography>
            <Typography sx={{ fontWeight: "bolder", fontSize: 24 }}>
              2,303
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
            backgroundColor: "white",
            padding: 2,
            gap: 1,
            flex: 1,
            borderRadius: 2,
          }}
        >
          <ShoppingBasket
            sx={{
              width: 40,
              height: 40,
              color: "white",
              background: "#2F69EF",
              borderRadius: "50%",
              padding: 1,
              border: "10px solid rgb(232,239,253)",
            }}
          />
          <Box>
            <Typography sx={{ color: "#D5D5D5", fontWeight: "semibold" }}>
              {t("total-purchases")}
            </Typography>
            <Typography sx={{ fontWeight: "bolder", fontSize: 24 }}>
              299
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default TotalSalesOrdersPurchases;
