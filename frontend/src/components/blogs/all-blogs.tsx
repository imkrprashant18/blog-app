"use client";

import { BlogCard } from "./blog-card";
import { useEffect } from "react";
import { useBlogStore } from "@/store/get-all-blog-store";
import Link from "next/link";

interface AuthorDetails {
  fullName: string;
  avatar: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  authorDetails: AuthorDetails;
  featureImage: string;
}

interface BlogStore {
  data: Blog[];
}

const AllBlogs: React.FC<BlogStore> = () => {
  const { allBlogs, getAllBlogs } = useBlogStore();

  useEffect(() => {
    if (!allBlogs) {
      getAllBlogs();
    }
  }, [allBlogs, getAllBlogs]);

  const blogs = allBlogs?.data || [];

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

  return (
    <div className="w-full flex py-12 justify-center overflow-hidden">
      <div className="w-full flex justify-center items-center gap-12 flex-col overflow-hidden">
        {blogs?.map((blog: Blog) => (
          <Link
            key={blog?._id} // Apply key here
            href={`/all-blogs/${blog?._id}`}
            className="flex flex-col gap-12"
          >
            <BlogCard
              title={blog?.title}
              content={stripHtml(blog?.content)}
              authorName={blog?.authorDetails.fullName}
              authorAvatar={blog?.authorDetails.avatar}
              featureImage={blog?.featureImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
