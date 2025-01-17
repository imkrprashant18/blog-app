"use client";

import Login from "@/pages/login-page/login-page";
import React from "react";
import PublicRoute from "@/components/user-auth/public-route";
const LoginPage = () => {
  return (
    <>
      <PublicRoute>
        <Login />
      </PublicRoute>
    </>
  );
};

export default LoginPage;
