import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check login status and fetch user name on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Check for accessToken
    const name = localStorage.getItem("username"); // Fetch userName from localStorage

    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
      setUserName(name || ""); // Set userName if available
    } else {
      setIsLoggedIn(false); // If token does not exist, user is logged out
      setUserName(""); // Clear userName
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // No need for `lastScrollY` dependency here, can be removed

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to logged out
    alert("You have been logged out."); // Show alert message
    navigate("/"); // Use the navigate function from useNavigate hook
    window.location.reload();
  };

  // const handleLogout = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then(() => {
  //       alert("You have been logged out.");
  //       navigate("/login"); // Redirect to login page after logout
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  return (
    <header
      className={`bg-white fixed md:w-full w-full z-50 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="px-4 lg:px-24 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex justify-between items-center w-full lg:w-auto`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium">
              {["/", "/Blog", "/about", "/Contract Us"].map((path, index) => (
                <li key={index} className="group relative">
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                  >
                    {path === "/"
                      ? "Home"
                      : path.replace("/", "").replace(/([A-Z])/g, " $1")}
                  </NavLink>
                  <span className="absolute left-0 bottom-0 top-7 md:top-7 w-0 h-[2px] bg-[#1ecb15] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}

              {/* Conditionally render login/logout button */}

              <li className="group relative">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                  >
                    Login
                  </NavLink>
                )}
              </li>
              <Link to={"/profile"}>
                <li>
                  {isLoggedIn && userName && (
                    <li className="group relative">
                      <span className=" py-2 pr-4 pl-3 font-semibold text-gray-700 border rounded-full flex justify-center items-center cursor-pointer">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </li>
                  )}
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
