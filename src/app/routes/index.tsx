import { default as AuthWrapper } from "../AuthWrapper";
import accountRouter from "../account/routes";
import ErrorPage from "../pages/ErrorPage";

const router = {
  path: "/",
  element: <AuthWrapper />,
  errorElement: <ErrorPage />,
  children: [
    {
      ...accountRouter,
      path: "/",
    },
    accountRouter,
  ],
};

export default router;
