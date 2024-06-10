import App from "../App";
import accountRouter from "../account/routes";
import ErrorPage from "../pages/ErrorPage";

const router = {
  path: "/",
  element: <App />,
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
