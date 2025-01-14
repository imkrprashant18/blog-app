/* eslint-disable react/prop-types */
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="w-screen flex h-screen justify-center   bg-[#101427]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
