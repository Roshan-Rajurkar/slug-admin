import { Suspense, useMemo } from "react";
import {
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/private";
import FullScreenLoader from "./common/components/fullscreenloader";

const App = () => {
  const { search } = useLocation();

  const AuthRoutes: RouteObject = useMemo(
    () => ({
      path: "auth/*",
      element: <AuthLayout />,
    }),
    [],
  );

  const AppRoutes: RouteObject = useMemo(
    () => ({
      path: "/app/*",
      element: <AppLayout />,
    }),
    [],
  );

  const DefaultRoutes: RouteObject = useMemo(
    () => ({
      path: "*",
      element: <Navigate to={`/auth${search}`} replace />,
    }),
    [search],
  );

  const routing = useRoutes([AuthRoutes, AppRoutes, DefaultRoutes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default App;
