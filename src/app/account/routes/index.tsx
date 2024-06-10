import ProtectedRoute from "../../auth/hocs/ProtectedRoute";
import AccountPage from "../pages/AccountPage";

const router = {
  path: "/account",
  index: true,
  element: <ProtectedRoute element={<AccountPage />} />,
};

export default router;
