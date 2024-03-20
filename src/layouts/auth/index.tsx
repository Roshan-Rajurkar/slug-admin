import { Suspense, useMemo } from "react";
import { Outlet, useRoutes, RouteObject, Navigate } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import AuthLogin from "../../components/auth/login";
import AuthRegister from "../../components/auth/register";
import AuthNaviagtion from "../../common/components/authnavbar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "rgba(33, 35, 38, 0.2) 0px 10px 10px -10px",
        }}
      >
        <AuthNaviagtion />
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
          element: <AuthLogin />,
        },
        {
          path: "register",
          element: <AuthRegister />,
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
