import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCustomersActiveStats } from "../../customers/services";

const ActiveUsersPieCharts = () => {
  const { t } = useTranslation("dashboard");

  const { data: customerActiveStats, isLoading } = useGetCustomersActiveStats();
  console.log(customerActiveStats, isLoading);

  const seriesData = [
    { id: 0, value: 10, label: t("active") },
    { id: 1, value: 15, label: t("inactive") },
  ];

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
        {t("users-status")}
      </Typography>{" "}
      <PieChart
        colors={["#3079E4", "#D1DDE7"]}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
        }}
        series={[
          {
            data: seriesData,
            innerRadius: 15,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            cx: 140,
            cy: 140,
          },
        ]}
        height={300}
      />
    </Box>
  );
};

export default ActiveUsersPieCharts;
