import { Suspense, lazy, useMemo } from "react";
import {
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
} from "react-router-dom";
import FullScreenLoader from "./common/components/fullscreenloader";

const LazyAuthLayout = lazy(() => import("./layouts/auth"));
const LazyAppLayout = lazy(() => import("./layouts/private"));

const App = () => {
  const { search } = useLocation();

  const AuthRoutes: RouteObject = useMemo(
    () => ({
      path: "/auth/*",
      element: <LazyAuthLayout />,
    }),
    [],
  );

  const AppRoutes: RouteObject = useMemo(
    () => ({
      path: "/app/*",
      element: <LazyAppLayout />,
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
