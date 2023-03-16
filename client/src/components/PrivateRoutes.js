import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import { ROUTES } from "../utils/constants";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { authenticated } = useContext(AuthContext);

  return authenticated ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
