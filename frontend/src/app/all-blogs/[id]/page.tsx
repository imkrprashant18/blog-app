import SingleBlogPost from "@/components/blogs/single-blog-by-id";
import Layout from "@/components/layout/layout";
import ProtectedRoute from "@/components/user-auth/protected-route";
import React from "react";

const BlogPostById = () => {
  return (
    <>
      <ProtectedRoute>
        <Layout>
          <SingleBlogPost />
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default BlogPostById;
