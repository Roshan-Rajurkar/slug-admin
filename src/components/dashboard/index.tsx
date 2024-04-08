import { Grid } from "@mui/material";
import SalesAndOrdersPerMonthGraph from "./salesandorderspermonth";
import ActiveUsersPieCharts from "./activeusersPiechart";
import TotalSalesOrdersPurchases from "./totalsalesorderspurchases";
import OrdersTable from "./orderstables";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <TotalSalesOrdersPurchases />

      <Grid item xs={8}>
        <SalesAndOrdersPerMonthGraph />
      </Grid>

      <Grid item xs={4}>
        <ActiveUsersPieCharts />
      </Grid>

      <Grid item xs={10}>
        <OrdersTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
