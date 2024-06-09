import { Outlet } from "react-router-dom";
import { useAuth } from "../services/providers/auth/auth-provider";
import AppLayout from "./AppLayout";

const App = (): React.ReactElement => {
  const { isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return <div>Loading...</div>;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default App;
