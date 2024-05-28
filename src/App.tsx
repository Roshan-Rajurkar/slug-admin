import { Suspense, lazy, useMemo, useEffect, useState } from "react";
import {
  Navigate,
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import FullScreenLoader from "./common/components/fullscreenloader";
import { useGetProfile } from "./components/auth/service";

const LazyAuthLayout = lazy(() => import("./layouts/auth"));
const LazyAppLayout = lazy(() => import("./layouts/private"));

const App = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user } = useGetProfile();

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

  // useEffect(() => {
  //   const currentRoute = window.location.pathname;

  //   if (!user) {
  //     // remove ! from user once get profile start working
  //     if (currentRoute.startsWith("/app")) {
  //       navigate(currentRoute);
  //     } else {
  //       navigate("/app/dashboard");
  //     }
  //   } else {
  //     if (currentRoute.startsWith("/auth")) {
  //       navigate(currentRoute);
  //     } else {
  //       navigate("/auth/login");
  //     }
  //   }
  //   setIsLoading(false);
  // }, [navigate, user]);

  if (isLoading) <FullScreenLoader />;

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default App;
