/* eslint-disable @typescript-eslint/no-empty-function */
import {
  DefaultContext,
  FetchResult,
  NextLink,
  Observable,
  Operation,
  gql,
} from "@apollo/client";

// eslint-disable-next-line react-refresh/only-export-components
export const mockForward: NextLink = jest.fn(() => {
  return new Observable<FetchResult>(() => {});
});

export const MockQuery = gql`
  query {
    thing
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const createMockOperation = function (): Operation {
  let context = {};
  return {
    query: MockQuery,
    variables: {},
    operationName: "",
    extensions: {},
    getContext: jest.fn(() => context),
    setContext: jest.fn((cb: Partial<DefaultContext>["setContext"]) => {
      context = cb({ headers: {} });
    }),
  };
};
