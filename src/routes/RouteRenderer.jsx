import { useRoutes, useLocation } from "react-router-dom";
import RoutesConfig from "./routes.config";
import RouteErrorBoundary from "../components/RouteErrorBoundary";

const RouteRenderer = () => {
  const location = useLocation();
  const routeObjects = RoutesConfig();
  const routes = useRoutes(routeObjects);
  return (
    <RouteErrorBoundary key={location.pathname}>{routes}</RouteErrorBoundary>
  );
};

export default RouteRenderer;
