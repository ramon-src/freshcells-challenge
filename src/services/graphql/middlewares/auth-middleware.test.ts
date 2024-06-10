import {
  DefaultContext,
  FetchResult,
  NextLink,
  Observable,
  Operation,
  gql,
} from "@apollo/client";
import authMiddleware from "./auth-middleware";

describe("authMiddleware", () => {
  const createMockOperation = function (): Operation {
    let context = {};
    const MockQuery = gql`
      query {
        thing
      }
    `;
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

  test("should add authorization header if token exists in localStorage", () => {
    const mockToken = "any.bearer.token";
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(mockToken),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    const mockOperation = createMockOperation();
    const mockForward: NextLink = jest.fn((operation) => {
      return new Observable<FetchResult>(() => {});
    });

    authMiddleware.request(mockOperation, mockForward);

    expect(mockOperation.setContext).toHaveBeenCalledTimes(1);
    expect(mockForward).toHaveBeenCalledTimes(1);
    expect(mockOperation.getContext()).toEqual({
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    });
  });
  test("should not add authorization header if token does not exist in localStorage", () => {
    const mockToken = "";
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(mockToken),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    const mockOperation = createMockOperation();
    const mockForward: NextLink = jest.fn((operation) => {
      return new Observable<FetchResult>(() => {});
    });

    authMiddleware.request(mockOperation, mockForward);

    expect(mockOperation.setContext).toHaveBeenCalledTimes(1);
    expect(mockForward).toHaveBeenCalledTimes(1);
    expect(mockOperation.getContext()).toEqual({
      headers: {
        authorization: "",
      },
    });
  });
});
