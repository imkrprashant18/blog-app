import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/Navbar";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
