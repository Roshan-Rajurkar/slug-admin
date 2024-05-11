import { Suspense } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import OrdersList from "./ordersList";
import OrderView from "./order-view";
import { useGetOrders } from "./services";

const Layout = () => {
  return <Outlet />;
};

const Orders = () => {
  const { data: orders, isLoading } = useGetOrders();

  const routes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <OrdersList orders={orders} />,
      },
      {
        path: "order/:id",
        element: <OrderView />,
      },
      {
        path: "*",
        element: <Navigate to="" replace />,
      },
    ],
  };
  const routing = useRoutes([routes]);
  if (isLoading) return <FullScreenLoader />;

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default Orders;
