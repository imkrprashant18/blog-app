"use client";

import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";

import Layout from "@/components/layout/layout";
import AllBlogs from "@/components/blogs/all-blogs";
const DashBoardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <AllBlogs />
      </Layout>
    </ProtectedRoute>
  );
};

export default DashBoardPage;
