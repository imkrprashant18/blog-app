import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogPost } from "@/store/authSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BlogUploadForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeatureImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    dispatch(createBlogPost(formData))
      .unwrap()
      .then(() => {
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setFeatureImage(null);
        setImagePreview("");
      })
      .catch((err) => {
        console.error("Error creating blog:", err);
        alert(`Failed to create blog: ${err.message || err}`);
      });
  };

  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Business",
    "Health",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
        <CardDescription>
          Fill in the details for your new blog post
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featureImage">Featured Image</Label>
            <div className="grid gap-4">
              <Input
                id="featureImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
                required
              />
              {imagePreview && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Publishing..." : "Publish Post"}
          </Button>
        </CardFooter>
      </form>

      {/* Error Handling */}
      {error && (
        <p className="text-red-500 text-center">
          {error.message || "An error occurred while creating the blog."}
        </p>
      )}
    </Card>
  );
};

export default BlogUploadForm;
