"use client";
import React, { useEffect } from "react";
import { useBlogByIdStore } from "@/store/get-blogs-by-id-store";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useDeleteBlogStore } from "@/store/delete-blog-store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
const SingleBlogPost = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { Blog, isLoading, error, getAllBlog } = useBlogByIdStore();

  const { deleteBlog } = useDeleteBlogStore();
  const { toast } = useToast();

  // Function to strip HTML tags safely
  const stripHtml = (html: string = "") => html.replace(/<[^>]*>/g, "");

  useEffect(() => {
    getAllBlog(id); // Fetch the blog when ID changes
  }, [id, getAllBlog]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Fallback for missing Blog data
  const blogData = Blog?.data;

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      router.push("/dashboard");
      toast({
        title: "Delete SuccessFully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Delete Failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center p-12">
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-md text-center font-semibold uppercase">
          {blogData?.title || "No title available"}
        </h1>

        <div className="flex items-center gap-4 w-full">
          <Avatar className="h-10 w-10">
            {blogData?.authorDetails?.avatar ? (
              <AvatarImage
                src={blogData.authorDetails.avatar}
                alt={blogData.authorDetails.fullName}
                className="object-cover"
              />
            ) : (
              <AvatarFallback>
                {blogData?.authorDetails?.fullName?.slice(0, 2).toUpperCase() ||
                  "NA"}
              </AvatarFallback>
            )}
          </Avatar>
          <p className="text-md font-semibold">
            {blogData?.authorDetails?.fullName || "Unknown Author"}
          </p>
        </div>

        <div className="relative">
          {/* Update & Delete Buttons */}
          {blogData?.authorDetails && (
            <div className="absolute right-0 flex gap-4 p-4">
              <Link href="/update-blog" className="bg-green-400">
                Update
              </Link>
              <Button onClick={() => handleDelete()}>Delete</Button>
            </div>
          )}

          {/* Feature Image */}
          {blogData?.featureImage ? (
            <Image
              src={blogData.featureImage}
              alt={blogData.title || "Feature Image"}
              width={800}
              height={400}
              className="w-full rounded-md"
            />
          ) : (
            <p>No feature image available</p>
          )}
        </div>

        {/* Blog Content */}
        <div className="w-full h-auto overflow-x-scroll">
          {stripHtml(blogData?.content)}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPost;
