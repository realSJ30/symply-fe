import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";
import Nav from "@/components/custom/nav";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { routes } = RouteList({ isAuthenticated, isLoading });
  const router = createBrowserRouter(routes);
  return (
    <div className="font-roboto">
      <Nav />
      <div className="p-8 h-full">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
