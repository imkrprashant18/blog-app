import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { fetchBlogDetails } from "./blogSlice";
import { fetchBlogDetails } from "../../Store/authSlice";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the route
  const dispatch = useDispatch();
  const { blogDetails, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogDetails(id)); // Fetch blog details when component loads
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "failed") {
    console.error("Error object:", error); // Log the error for debugging
    return <p>Error: {error.message || "Something went wrong"}</p>;
  }

  // Access the blog object from the response
  const blog = blogDetails?.blog;

  return (
    <div>
      {blog ? (
        <div>
          <h1>{blog.title}</h1>
          <img src={blog.featureImage} alt={blog.title} />
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>
            Author: {blog.author?.fullName}
            <img
              src={blog.author?.avatar}
              alt={blog.author?.fullName}
              style={{ width: "50px", borderRadius: "50%" }}
            />
          </p>
        </div>
      ) : (
        <p>No blog details found.</p>
      )}
    </div>
  );
};

export default BlogDetails;
