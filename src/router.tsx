import { createBrowserRouter } from "react-router-dom";
import appRouter from "./app/routes";
import authRouter from "./auth/routes";

export const router = createBrowserRouter([appRouter, authRouter]);
