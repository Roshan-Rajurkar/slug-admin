import { Suspense, lazy, useMemo } from "react";
import { Outlet, useRoutes, RouteObject, Navigate } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import { Box } from "@mui/material";

const LazyAuthLogin = lazy(() => import("../../components/auth/login"));
const LazyAuthRegister = lazy(() => import("../../components/auth/register"));
const LazyAuthNavigation = lazy(
  () => import("../../common/components/authnavbar"),
);

const Layout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "rgba(33, 35, 38, 0.3) 0px 10px 10px -10px",
        }}
      >
        <LazyAuthNavigation />
      </Box>
      <Box sx={{ flex: 1, backgroundColor: "#F1F1F6" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const AuthLayout = () => {
  const AuthRoutes: RouteObject = useMemo(
    () => ({
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Navigate to="login" replace />,
        },
        {
          path: "login",
          element: <LazyAuthLogin />,
        },
        {
          path: "register",
          element: <LazyAuthRegister />,
        },
        {
          path: "help",
          element: <p>Help page implementation</p>,
        },
        {
          path: "*",
          element: <Navigate to="login" replace />,
        },
      ],
    }),
    [],
  );

  const routing = useRoutes([AuthRoutes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default AuthLayout;
