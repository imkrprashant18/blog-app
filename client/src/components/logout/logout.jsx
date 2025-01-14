import { useUserLogoutStore } from "../../store/logout-store";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const { logout, isLoading, error } = useUserLogoutStore();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      {error && <p className="text-red-500 text-center pb-2">{error}</p>}
      <button
        onClick={handleLogout}
        className="w-full rounded-md bg-[#16404D] p-2 text-white transition-colors duration-200 hover:bg-[#DDA853]"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default Logout;
