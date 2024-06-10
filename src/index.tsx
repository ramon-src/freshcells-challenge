import ConfigProvider from "antd/lib/config-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./router";
import { AuthProvider } from "./services/auth/auth-provider";
import ApolloClientProvider from "./services/graphql/providers/apollo-client-provider";
import NotificationProvider from "./services/notification/providers/notification-provider";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NotificationProvider>
      <ApolloClientProvider>
        <AuthProvider>
          <ConfigProvider theme={theme}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </AuthProvider>
      </ApolloClientProvider>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
