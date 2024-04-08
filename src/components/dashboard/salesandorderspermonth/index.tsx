import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { salesAndGraphsMockData } from "../mock";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const highlightScope = {
  highlighted: "series",
  faded: "global",
} as const;

export default function SalesAndOrdersPerMonthGraph() {
  const { t } = useTranslation("dashboard");

  const series = [
    {
      label: t("orders"),
      data: salesAndGraphsMockData.map((item) => item.orders),
    },
    {
      label: t("sales"),
      data: salesAndGraphsMockData.map((item) => item.sales),
    },
  ].map((s) => ({ ...s, highlightScope }));

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#565656",
          backgroundColor: "white",
          paddingX: 2,
          paddingTop: 2,
        }}
      >
        {t("sales-statistics")}
      </Typography>
      <BarChart
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          padding: 1,
        }}
        colors={["#3079E4", "#D1DDE7"]}
        xAxis={[
          {
            scaleType: "band",
            data: [
              t("months.jan"),
              t("months.feb"),
              t("months.mar"),
              t("months.apr"),
              t("months.may"),
              t("months.jun"),
              t("months.jul"),
              t("months.aug"),
              t("months.sept"),
              t("months.oct"),
              t("months.nov"),
              t("months.dec"),
            ],
          },
        ]}
        height={300}
        series={series}
      />
    </Box>
  );
}
