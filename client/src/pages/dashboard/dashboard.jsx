import Layout from "../../components/layout/Layout";
import { useUserAuthStore } from "../../store/user-auth-store";

const DashboardPage = () => {
  const { user } = useUserAuthStore();

  return (
    <>
      <Layout>
        <h1>{user?.user?.fullName.toUpperCase()}</h1>
        <h1>{user?.user?.email}</h1>
        <img
          src={user?.user?.avatar}
          alt={user?.user?.fullName}
          className="h-12 w-12 rounded-full object-cover border-2 border-green-600"
        />
        <h1>
          {user?.user?.createdAt
            ? new Date(user.user.createdAt).toLocaleString("default", {
                month: "long",
                year: "numeric",
                day: "numeric",
              })
            : "N/A"}
        </h1>
      </Layout>
    </>
  );
};

export default DashboardPage;
