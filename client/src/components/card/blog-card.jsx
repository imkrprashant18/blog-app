/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { Heart, MessageCircle, MoreHorizontal, Bookmark } from "lucide-react";
import { useState } from "react";

export default function BlogCard() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(1234);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md border-2 cursor-pointer border-[#222c45]  rounded-xl shadow-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#DDA853]">
            <img
              src="/api/placeholder/40/40"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#A6CDC6]">johndoe</h3>
            <p className="text-xs text-gray-400">San Francisco, CA</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-[#16404D] p-1 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Image */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src="/api/placeholder/600/600"
          alt="Blog post image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-1 rounded-full hover:bg-gray-100 ${
                isLiked ? "text-red-500" : "text-[#A6CDC6]"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full hover:bg-gray-100 text-[#16404D]"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1 rounded-full hover:bg-gray-100 ${
              isSaved ? "text-[#DDA853]" : "text-[#A6CDC6]"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <p className="font-medium text-sm text-[#A6CDC6]">
            {likes.toLocaleString()} likes
          </p>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold text-[#A6CDC6] mr-1">johndoe</span>
            <span className="text-[#C890A7]">
              Just shipped a new feature! 🚀 Check out our latest blog post
              about the future of web development. #webdev #coding #technology
            </span>
          </p>
          <p className="text-xs text-[#5D8736] uppercase">2 hours ago</p>
        </div>

        {/* Comment Input */}
        <div className="mt-4 flex items-center border-t border-[#8174A0] pt-2  pb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 h-8 px-4  bg-[#101427] border-b-1 border-t-none border-l-none border-r-none  border-[#578E7E] outline-none text-sm  placeholder-gray-400 text-gray-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#DDA853] font-medium text-sm ml-2"
          >
            Post
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
