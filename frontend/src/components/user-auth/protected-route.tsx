"use client";

import { ReactNode, useEffect } from "react";
import { useUserAuthStore } from "@/store/user-auth-store";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { currentUser, getCurrentUser } = useUserAuthStore();

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
  }, [currentUser, getCurrentUser]);

  if (sessionStorage.getItem("accessToken")) {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
};

export default ProtectedRoute;
