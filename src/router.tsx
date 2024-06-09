import { createBrowserRouter } from "react-router-dom";
import authRouter from "./app/auth/routes";
import appRouter from "./app/routes";

export const router = createBrowserRouter([...authRouter, appRouter]);
