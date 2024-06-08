import { Navigate } from "react-router-dom";
import { useAuth } from "../services/providers/auth/auth-provider";
import App from "./App";

const AuthWrapper = (): React.ReactElement => {
  const { isAuthenticating, isAuthenticated } = useAuth();

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <App /> : <Navigate to="/auth" />;
};

export default AuthWrapper;
