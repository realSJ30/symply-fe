import { Navigate, RouteObject } from "react-router-dom";
import Loading from "@/components/custom/loading";
import AuthPage from "@/pages/auth-page";
import ErrorPage from "@/pages/error-page";
import HomePage from "@/pages/home-page";

interface RouteParams {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const RouteList = ({ isAuthenticated, isLoading }: RouteParams) => {
  const protectedRoutes = (element: React.ReactElement): React.ReactElement => {
    return isAuthenticated ? element : <Navigate to={"/"} />;
  };

  const errorPage = {
    errorElement: <ErrorPage />,
  };

  const routes: RouteObject[] = [
    {
      path: "/",
      element: isLoading ? (
        <Loading />
      ) : !isAuthenticated ? (
        <AuthPage />
      ) : (
        <Navigate to={"/home"} />
      ),
      ...errorPage,
    },
    {
      path: "/home",
      element: protectedRoutes(<HomePage />),
      ...errorPage,
    },
  ];

  return { routes };
};
