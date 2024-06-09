import { ApolloClient, HttpLink, InMemoryCache, concat } from "@apollo/client";
import authMiddleware from "./middlewares/auth-middleware";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
