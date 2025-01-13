import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PenSquare, Heart, User, Menu } from "lucide-react";
import Logout from "../logout/logout";
import { useUserAuthStore } from "../../store/user-auth-store";

export default function Sidebar() {
  const { user } = useUserAuthStore();
  const id = user?.user?._id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: PenSquare, label: "Create", href: "/create" },
    { icon: Heart, label: "Notifications", href: "/notifications" },
    { icon: User, label: "Profile", href: `/profile/${id}` },
  ];
  return (
    <motion.nav
      initial={false}
      animate={{ width: isCollapsed ? "auto" : "240px" }}
      className={`fixed left-0 top-0 z-40 h-screen bg-[#101427] border-r-2  border-[#222c45] shadow-lg transition-all duration-300 ease-in-out 
        ${isCollapsed ? "w-16" : "w-60"} 
         dark:text-white`}
    >
      <div className="flex h-full flex-col justify-between p-3">
        <div>
          <div className="mb-8 flex items-center justify-between">
            {!isCollapsed && (
              <Link
                to="/"
                className="text-2xl font-bold text-[#16404D] dark:text-[#DDA853]"
              >
                BlogApp
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="rounded-full p-2 text-[#16404D] hover:bg-gray-100 dark:text-[#DDA853] dark:hover:bg-gray-700"
            >
              <Menu size={24} />
            </button>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center rounded-md p-2 text-[#16404D] transition-colors duration-200 hover:bg-gray-100 
                    dark:text-[#DDA853] dark:hover:bg-gray-700 
                    ${
                      pathname === item.href
                        ? "bg-[#DDA853] text-white dark:bg-[#16404D]"
                        : ""
                    }`}
                >
                  <item.icon size={24} />
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">{!isCollapsed && <Logout />}</div>
      </div>
    </motion.nav>
  );
}
