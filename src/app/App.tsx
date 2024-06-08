import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";

const App = (): React.ReactElement => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default App;
