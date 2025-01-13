/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("accessToken");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
