import React, { Suspense, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import { NavigationType } from "../../common/modals";
import SideNavigation from "../../common/components/sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import AppNavigation from "../../common/components/appnavbar";
import { Typography } from "@mui/material";

const LazyDashboard = React.lazy(() => import("../../components/dashboard"));
const LazyProducts = React.lazy(() => import("../../components/products"));

const Layout = () => {
  const { t } = useTranslation();

  const [navigationItems, setNavigationItems] = useState<NavigationType[]>([
    {
      name: t("sidenav.dashboard"),
      href: "dashboard",
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
    <Box display={"flex"} height="100vh" sx={{ backgroundColor: "#F5F5F5" }}>
      <SideNavigation
        navigation={navigationItems}
        onNavigationClick={handleNavigationClick}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AppNavigation />
        <Box
          sx={{
            padding: 2,
            flexDirection: "column",
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {navigationItems?.map((item) =>
            item.active && item.href !== "products" ? (
              <Typography
                key={item.name}
                sx={{
                  fontSize: 24,
                  marginBottom: 2,
                  fontWeight: "bolder",
                  color: "#1C1C1C",
                }}
              >
                {item.name}
              </Typography>
            ) : null,
          )}
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
        element: <LazyDashboard />,
      },
      {
        path: "products/*",
        element: <LazyProducts />,
      },
      {
        path: "customers",
        element: <p>Customer component</p>,
      },
      {
        path: "settings",
        element: <p>Settings component</p>,
      },
      {
        path: "*",
        element: <Navigate to="dashboard" />,
      },
    ],
  };

  const routing = useRoutes([routes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default AppLayout;
