import {
  DefaultContext,
  FetchResult,
  NextLink,
  Observable,
  Operation,
  gql,
} from "@apollo/client";

export const mockForward: NextLink = jest.fn((operation) => {
  return new Observable<FetchResult>(() => {});
});

export const MockQuery = gql`
  query {
    thing
  }
`;

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
