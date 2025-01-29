import Layout from "@/components/layout/layout";
import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";

const UpdateBlogs = () => {
  return (
    <>
      <ProtectedRoute>
        <Layout>
          <h1>Hello</h1>
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default UpdateBlogs;
