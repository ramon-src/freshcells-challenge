import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { NotificationContextType } from "../notification/providers/notification-provider";
import authMiddleware from "./middlewares/auth-middleware";
import createErrorLink from "./middlewares/error-middleware";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

export const createApolloClient = (
  notifier: NotificationContextType["notify"]
) => {
  const errorLink = createErrorLink(notifier);

  const client = new ApolloClient({
    link: from([errorLink, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
  return client;
};
