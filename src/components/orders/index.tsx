import { Suspense } from "react";
import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import OrdersList from "./ordersList";
import OrderView from "./order-view";

const Layout = () => {
  return <Outlet />;
};

const Orders = () => {
  const routes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <OrdersList />,
      },
      {
        path: "orders/:id",
        element: <OrderView />,
      },
    ],
  };
  const routing = useRoutes([routes]);
  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default Orders;
