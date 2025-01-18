import Layout from "@/components/layout/layout";
import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";
import AddPostForms from "@/pages/add-post/forms-add-post";
const AddPostPage = () => {
  return (
    <>
      <ProtectedRoute>
        <Layout>
          <AddPostForms />
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default AddPostPage;
