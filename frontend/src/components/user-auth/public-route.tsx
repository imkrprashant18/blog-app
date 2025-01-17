import { useRouter } from "next/navigation";
import { ReactNode } from "react";
interface PublicRouteProps {
  children: ReactNode;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    router.push("/dashboard");
    return null;
  } else {
    return <>{children}</>;
  }
};

export default PublicRoute;
