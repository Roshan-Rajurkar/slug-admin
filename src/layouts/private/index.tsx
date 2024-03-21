import React, { Suspense, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import { Navigation } from "../../common/modals";
import SideNavigation from "../../common/components/sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";

const Layout = () => {
  const { t } = useTranslation("dashboard");

  const [navigationItems, setNavigationItems] = useState<Navigation[]>([
    {
      name: t("sidenav.dashboard"),
      href: "dashbaord",
      active: true,
      icon: <DashboardIcon />,
    },
    {
      name: t("sidenav.products"),
      href: "products",
      active: false,
      icon: <BreakfastDiningIcon />,
    },
    {
      name: t("sidenav.customers"),
      href: "customers",
      active: false,
      icon: <GroupIcon />,
    },
    {
      name: t("sidenav.settings"),
      href: "settings",
      active: false,
      icon: <SettingsIcon />,
    },
  ]);

  const handleNavigationClick = useCallback(
    (index: number) => {
      const updatedNavigationItems = navigationItems.map((item, i) => ({
        ...item,
        active: i === index,
      }));
      setNavigationItems(updatedNavigationItems);
    },
    [navigationItems],
  );

  return (
    <Box display={"flex"}>
      <SideNavigation
        navigation={navigationItems}
        onNavigationClick={handleNavigationClick}
      />

      <Box>
        <Box> Build App navbar now</Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

const AppLayout = () => {
  const routes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <p>Dashbaord component</p>,
      },
      {
        path: "products",
        element: <p>Products component</p>,
      },
      {
        path: "customers",
        element: <p>Cusomters component</p>,
      },
      {
        path: "settings",
        element: <p>Settings component</p>,
      },
      {
        path: "*",
        element: <p>no route found</p>,
      },
    ],
  };

  const routing = useRoutes([routes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default AppLayout;
