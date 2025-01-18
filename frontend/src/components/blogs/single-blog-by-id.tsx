"use client";

import React, { useEffect } from "react";
import { useBlogByIdStore } from "@/store/get-blogs-by-id-store";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";

const SingleBlogPost = () => {
  const params = useParams();
  const id = params?.id as string;
  const { Blog, isLoading, error, getAllBlog } = useBlogByIdStore();

  useEffect(() => {
    if (!Blog) {
      getAllBlog(String(id));
    }
  }, [Blog, getAllBlog, id]);

  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-center p-12">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-md text-center font-semibold uppercase">
            {Blog?.data?.title}
          </h1>
          <div className="flex items-center gap-4 w-full">
            <Avatar className="h-10 w-10">
              {/* Conditionally render AvatarImage if a valid src exists */}
              {Blog?.data?.authorDetails?.avatar ? (
                <AvatarImage
                  src={Blog.data.authorDetails.avatar}
                  alt={Blog.data.authorDetails.fullName}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback>
                  {/* Fallback for missing avatar */}
                  {Blog?.data?.authorDetails?.fullName
                    ?.slice(0, 2)
                    .toUpperCase() || "NA"}
                </AvatarFallback>
              )}
            </Avatar>
            <p className="text-md font-semibold">
              {Blog?.data?.authorDetails?.fullName}
            </p>
          </div>
          <div className="relative">
            {/* update and delete button */}
            {Blog?.data?.authorDetails ? (
              <>
                <div className="absolute right-0 flex gap-4 p-4">
                  <Button className="bg-green-400">Update</Button>
                  <Button>Delete</Button>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Conditionally render Image if a valid src exists */}
            {Blog?.data?.featureImage ? (
              <Image
                src={Blog.data.featureImage}
                alt={Blog.data.title}
                width={800}
                height={400}
                className="w-full rounded-md"
              />
            ) : (
              <p>No feature image available</p> // Fallback for missing image
            )}
          </div>
          <div className="w-full h-auto overflow-x-scroll">
            {Blog?.data?.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPost;
