"use client";

import React from "react";
import RegisterPage from "@/pages/register/register-page";
import PublicRoute from "@/components/user-auth/public-route";
const Register = () => {
  return (
    <>
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    </>
  );
};

export default Register;
