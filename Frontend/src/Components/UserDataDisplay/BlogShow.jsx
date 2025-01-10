import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getBlogsByUser,
  updateBlog,
  updateFeatureImage,
} from "../../Store/authSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const { filteredBlogs, status, error } = useSelector((state) => state.auth);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingImageBlog, setEditingImageBlog] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Business",
    "Health",
  ];

  useEffect(() => {
    dispatch(getBlogsByUser());
  }, [dispatch]);

  // Handle image upload
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleImageUpload = async (blogId) => {
    if (newImage) {
      try {
        const featureImage = new FormData();
        featureImage.append("image", newImage);

        // Dispatch the action to update the feature image
        const resultAction = await dispatch(
          updateFeatureImage({ blogId, formData: featureImage }) // Use `blogId` here instead of `id`
        );

        // Debugging: Log the resultAction to see the response
        console.log("Result action:", resultAction);

        // Handle the success or failure of the API call
        if (updateFeatureImage.fulfilled.match(resultAction)) {
          setNewImage(null); // Clear selected image
          setEditingImageBlog(null); // Reset image editing state
          dispatch(getBlogsByUser()); // Re-fetch blogs to reflect changes
        } else {
          console.error("Failed to upload image:", resultAction.error.message);
          alert(`Failed to upload image: ${resultAction.error.message}`);
        }
      } catch (error) {
        console.error("Error updating image:", error);
        alert("An error occurred while uploading the image.");
      }
    } else {
      alert("Please select an image first.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBlog) {
      try {
        // Dispatch the action to update the blog
        const resultAction = await dispatch(
          updateBlog({
            id: editingBlog._id,
            updatedData: formData,
          })
        );

        // Check if the update was successful
        if (updateBlog.fulfilled.match(resultAction)) {
          // Update the local state for real-time updates
          const updatedBlog = resultAction.payload; // Assuming the updated blog is returned in the payload
          setEditingBlog(null); // Reset the editing state
          setFormData({ title: "", content: "", category: "" }); // Clear the form

          // Optionally re-fetch blogs or update the local list
          dispatch(getBlogsByUser());
        }
      } catch (error) {
        console.log("Error updating blog:", error);
      }
    }
  };

  // Edit selected blog
  const handleEdit = (blog) => {
    setEditingBlog(blog); // Set the blog to be edited
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      category: blog.category || "",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {filteredBlogs.length === 0 ? (
        <p>No blogs found for this user.</p>
      ) : (
        <div className="overflow-x-auto px-5 mb-5">
          <table className="min-w-full bg-white border border-gray-500">
            <thead className="bg-gray-100 border border-gray-500 ">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  S.N
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Avatar
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Likes
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Comments
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-[16px] text-gray-900 border border-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr className="hover:bg-gray-50" key={blog._id}>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {`${blog.title || ""} `}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {blog.content}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    <img
                      src={blog.featureImage || ""}
                      className="w-10 h-10"
                      alt=""
                    />
                    {editingImageBlog === blog._id ? (
                      <div className="mt-2">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="block"
                        />
                        <button
                          onClick={() => handleImageUpload(blog._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded mt-1"
                        >
                          Upload
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingImageBlog(blog._id)}
                        className="text-blue-500 underline"
                      >
                        Change Image
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {blog.category || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {blog.createdAt || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {Array.isArray(blog.likes) && blog.likes.length > 0
                      ? blog.likes.slice(0, 2).map((like, idx) => (
                          <p key={idx} className="truncate">
                            {like || "No text"}
                          </p>
                        ))
                      : "No Likes"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500">
                    {Array.isArray(blog.comments) && blog.comments.length > 0
                      ? blog.comments.slice(0, 2).map((comment, idx) => (
                          <p key={idx} className="truncate">
                            {comment.text || "No text"}
                          </p>
                        ))
                      : "No Comments"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-500 ">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="mr-2 bg-blue-500 text-white px-3 py-1 rounded mb-2"
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingBlog && (
        <div className="mt-5 px-20 mb-5">
          <h2 className="text-xl font-bold">Update Blog</h2>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="block text-sm font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-500 px-3 py-2 w-full"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="border border-gray-500 px-3 py-2 w-full"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-500 px-3 py-2 w-full"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Blog
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogList;
