import {
  ApolloLink,
  FetchResult,
  NextLink,
  Observable,
  Operation,
} from "@apollo/client";

const authMiddleware = new ApolloLink(
  (
    operation: Operation,
    forward: NextLink
  ): Observable<
    FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>
  > => {
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
