import { motion } from "framer-motion";
import {
  Settings,
  Edit2,
  Mail,
  MapPin,
  Calendar,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import UpdateProfileSection from "./updateProfile-section";
import { useUserAuthStore } from "../../store/user-auth-store";
import { useState } from "react";
export default function ProfileSection() {
  const [show, setIsShow] = useState(false);

  const handleUpdateAvatarForm = () => {
    setIsShow(!show);
  };
  const { user } = useUserAuthStore();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full justify-center py-12  relative"
    >
      <div className="w-[40%] mx-auto ">
        {/* Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className=" rounded-2xl shadow-lg p-6 mb-6 border-2 border-[#222c45]"
        >
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-[#16404D]/10 rounded-xl mb-16">
              <img
                src={user?.user?.coverImage}
                alt={user?.user?.fullName}
                className="h-full w-full object-cover rounded"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
              >
                <Edit2 className="w-5 h-5 text-[#16404D]" />
              </motion.button>
            </div>

            {/* Profile Image */}
            <div
              className="absolute left-6 bottom-0 transform translate-y-1/2"
              onClick={handleUpdateAvatarForm}
            >
              <div className="w-32 h-32 rounded-full bg-[#16404D] border-4 border-white overflow-hidden">
                <img
                  src={user?.user?.avatar || "N/A"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {show && <UpdateProfileSection setIsShow={show} />}
            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 bottom-4 px-4 py-2 bg-[#16404D] text-white rounded-full flex items-center gap-2 hover:bg-[#DDA853] transition duration-300"
            >
              <Link
                to="/edit-profile"
                className="flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </Link>
            </motion.button>
          </div>

          {/* Profile Info */}
          <div className="mt-16">
            <h1 className="text-2xl font-bold text-[#A6CDC6]">
              {user?.user?.fullName || "N/A"}
            </h1>
          </div>
          <p className="mt-4 text-[#FBF5DD]">
            {user?.user?.bio.toUpperCase() || "N/A"}
          </p>

          {/* Profile Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-[#DF9755]">
              <Mail className="w-4 h-4" />
              <span>{user?.user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-[#DF9755]">
              <MapPin className="w-4 h-4" />
              <span>{user?.user?.address || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-[#DF9755]">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {user?.user?.createdAt
                  ? new Date(user.user.createdAt).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#DF9755]">
              <Linkedin className="w-4 h-4" />
              <Link to="#" className="text-[#DF9755] hover:text-[#DDA853]">
                {user?.user?.linkedin || "N/A"}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="border-2 border-[#222c45] p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-[#A6CDC6]">Posts</h3>
            <p className="text-3xl font-bold text-[#DDA853] mt-2">128</p>
          </div>
          <div className="border-2 border-[#222c45] p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-[#A6CDC6]">Likes</h3>
            <p className="text-3xl font-bold text-[#DDA853] mt-2">1.2k</p>
          </div>
          <div className="border-2 border-[#222c45] p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-[#A6CDC6]">Comments</h3>
            <p className="text-3xl font-bold text-[#DDA853] mt-2">847</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
