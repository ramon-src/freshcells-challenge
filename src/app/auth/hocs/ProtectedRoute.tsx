import { Navigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/auth-provider";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
