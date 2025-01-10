import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, toggleLikeBlog } from "../../Store/authSlice";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const BlogComponent = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.auth);

  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllBlogs());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please log in to view blogs.</div>;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleLike = (blogId) => {
    dispatch(toggleLikeBlog(blogId));
  };

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="blog-card flex flex-col " key={blog._id}>
            <Link to={`/${blog._id}`}>
              <img src={blog.featureImage} alt={blog.title} />
              <h2>Title : {blog.title}</h2>
              <p>Content : {blog.content}</p>
              <small>Category: {blog.category}</small>
            </Link>
            <div className="flex gap-5">
              <button
                className="flex items-center gap-2"
                onClick={() => handleLike(blog._id)}
              >
                {blog.liked ? (
                  <>
                    <Heart color="red" />
                    <span>Unlike</span>
                  </>
                ) : (
                  <>
                    <Heart />
                    <span>Like</span>
                  </>
                )}
              </button>
              <button className="">Comment</button>
            </div>
          </div>
        ))
      ) : (
        <div>No blogs available.</div>
      )}
    </div>
  );
};

export default BlogComponent;
