import { GraphQLError } from "graphql";
import {
  createMockOperation,
  mockForward,
} from "../../../../mocks/apollo-mocks";

type ErrorTypeMock = readonly GraphQLError[] | undefined;

let graphQLErrors: ErrorTypeMock = [];

export const mockGraphQLErrors = function (errors: ErrorTypeMock) {
  graphQLErrors = errors;
};

export const onError = (errorHandler: any) => {
  errorHandler({
    graphQLErrors,
    networkError: undefined,
    operation: createMockOperation(),
    forward: mockForward,
  });
};
