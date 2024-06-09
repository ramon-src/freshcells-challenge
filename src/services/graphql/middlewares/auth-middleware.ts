import { ApolloLink, NextLink, Operation } from "@apollo/client";

const authMiddleware = new ApolloLink(
  (operation: Operation, forward: NextLink) => {
    const token = localStorage.getItem("token");

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));

    return forward(operation);
  }
);

export default authMiddleware;
