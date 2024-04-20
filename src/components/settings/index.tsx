import React, { Suspense } from "react";
import {
  Link,
  Navigate,
  Outlet,
  RouteObject,
  useLocation,
  useRoutes,
} from "react-router-dom";
import FullScreenLoader from "../../common/components/fullscreenloader";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const Layout = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Side Navigation */}
      <Box sx={{ width: 150 }}>
        <List
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <ListItemButton
            component={Link}
            to={"/app/settings/profile"}
            selected={location.pathname.split("/")[3] === "profile"}
            sx={{
              margin: 0,
              paddingX: 1,
              background: "#",
            }}
          >
            <ListItemText
              sx={{ width: "100%", fontSize: "1rem", textAlign: "center" }}
              primary={"GENERAL"}
            />
          </ListItemButton>
        </List>
      </Box>

      <Box sx={{ flex: 1, padding: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const Settings = () => {
  const routes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="profile" replace />,
      },
      {
        path: "profile",
        element: <>Profile details</>,
      },
      {
        path: "*",
        element: <>Not found</>,
      },
    ],
  };

  const routing = useRoutes([routes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default Settings;
