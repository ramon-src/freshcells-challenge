import { LoadingOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useAuth } from "../services/auth/auth-provider";
import AppLayout from "./AppLayout";

const App = (): React.ReactElement => {
  const { isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return <LoadingOutlined spin allowFullScreen />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default App;
