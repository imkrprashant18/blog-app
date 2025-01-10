import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  Grid,
  Settings,
  User,
  Upload,
  Receipt,
  Eye,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/authSlice";
import UserProfile from "./UserDataDisplay";
import UpdateDetails from "./UpdateDetails";
import BlogUploadForm from "./BlogUploadForm";
import BlogList from "./BlogShow";

const UserData = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Sorry you are not logged in</p>
      </div>
    );
  }

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Grid className="h-5 w-5 text-white" />,
    },
    {
      id: "userData",
      label: "UserData",
      icon: <User className="h-5 w-5 text-white" />,
    },
    {
      id: "updateDetails",
      label: "Update Details",
      icon: <Receipt className="h-5 w-5 text-white" />,
    },
    {
      id: "uploadBlog",
      label: "Upload Blog",
      icon: <Upload className="h-5 w-5 text-white" />,
    },

    {
      id: "blogshow",
      label: "Show All Blogs",
      icon: <Eye className="h-5 w-5 text-white" />,
    },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "userData":
        return <UserProfile />;
      case "updateDetails":
        return <UpdateDetails />;
      case "uploadBlog":
        return <BlogUploadForm />;
      case "blogshow":
        return <BlogList />;

      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p>Welcome to the admin dashboard</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 pt-[75px]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64  border-r bg-gray-800">
        {/* Admin Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <img
                src={user?.avatar || "default-avatar.png"}
                className="w-10 h-10 "
                alt="User Avatar"
              />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                {user?.fullName || "Guest"}
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeView === item.id ? "default" : "ghost"}
                  className={`w-full justify-start hover:bg-black ${
                    activeView === item.id ? "bg-blue-500" : ""
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  {item.icon}
                  <span className="ml-3 text-white">{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-b bg-white">
            <ul className="p-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeView === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pt-0">
        <div className="">{renderContent()}</div>
      </main>
    </div>
  );
};

export default UserData;
