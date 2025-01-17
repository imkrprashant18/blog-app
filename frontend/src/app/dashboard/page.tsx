"use client";

import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";
import { useUserAuthStore } from "@/store/user-auth-store";

const DashBoardPage: React.FC = () => {
  const { currentUser } = useUserAuthStore();
  console.log("Current User:", currentUser);
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
    </ProtectedRoute>
  );
};

export default DashBoardPage;
