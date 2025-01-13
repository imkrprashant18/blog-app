/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserAuthStore } from "../../store/user-auth-store";
import AnimatedSVG from "../../pages/fall-back/Animated";

const ProtectedRoute = ({ children }) => {
  const { user, getCurrentUser, isLoading, error } = useUserAuthStore();
  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  if (isLoading) {
    return (
      <>
        <AnimatedSVG />
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1 className="text-red-400">{error}</h1>
      </>
    );
  }

  if (sessionStorage.getItem("accessToken") && user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
