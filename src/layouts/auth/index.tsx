import React, { Suspense, useMemo } from "react";
import { Outlet, useRoutes, RouteObject, Navigate } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import AuthLogin from "../../components/auth/login";
import AuthRegister from "../../components/auth/register";

const Layout = () => {
  return (
    <div>
      <p>Auth Layout</p>
      <Outlet />
    </div>
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
