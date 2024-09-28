import { useContext } from "react";
import UserContext from "@/context/user/UserContext";
import AuthLogin from "@/pages/auth/Login";

const ProtectedRoute = ({ children }) => {
  const { isUserAuthenticated } = useContext(UserContext);

  return isUserAuthenticated ? children : <AuthLogin />;
};

export default ProtectedRoute;
