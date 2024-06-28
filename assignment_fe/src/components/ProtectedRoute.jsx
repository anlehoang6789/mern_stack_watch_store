import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/404" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAdminRoute: PropTypes.bool,
};

export default ProtectedRoute;
