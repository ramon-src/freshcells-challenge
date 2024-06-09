// @ts-ignore: Ignore TypeScript error for unexported member
import { mockGraphQLErrors } from "@apollo/client/link/error";
import createErrorLink from "./error-middleware";

jest.mock("@apollo/client/link/error");

describe("createErrorLink", () => {
  it("should call notifier for each GraphQL error", () => {
    const graphQLErrors = [
      {
        message: "GraphQL error 1",
        extensions: {
          exception: {
            code: 400,
            data: {
              message: [
                {
                  messages: [{ id: "error.id.1", message: "Error message 1" }],
                },
              ],
            },
          },
        },
      },
      {
        message: "GraphQL error 2",
        extensions: {
          exception: {
            code: 400,
            data: {
              message: [
                {
                  messages: [{ id: "error.id.2", message: "Error message 2" }],
                },
              ],
            },
          },
        },
      },
    ];
    mockGraphQLErrors(graphQLErrors);

    const notifier = jest.fn();
    createErrorLink(notifier);

    expect(notifier).toHaveBeenCalledWith(
      "error",
      "error.id.1",
      "Error message 1"
    );
    expect(notifier).toHaveBeenCalledWith(
      "error",
      "error.id.2",
      "Error message 2"
    );
  });
});
