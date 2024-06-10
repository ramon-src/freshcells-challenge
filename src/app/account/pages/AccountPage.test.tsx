import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useAuth } from "../../../services/auth/auth-provider";
import { ACCOUNT } from "../../../services/graphql/queries/account";
import { LOGGED_USER } from "../../../services/graphql/queries/loggedUser";
import AccountPage from "./AccountPage";

jest.mock("../../../services/auth/auth-provider", () => ({
  useAuth: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: LOGGED_USER,
    },
    result: {
      data: {
        me: { id: "1", __typename: "User" },
      },
    },
  },
  {
    request: {
      query: ACCOUNT,
      variables: { id: "1" },
    },
    result: {
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          __typename: "User",
        },
      },
    },
  },
];

describe("AccountPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountPage />
      </MockedProvider>
    );

    expect(screen.getByTestId("account-loading")).toBeInTheDocument();
  });

  test("renders account information after loading", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: jest.fn(),
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
    });
  });

  test("calls logout on button click", async () => {
    const logoutMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      logout: logoutMock,
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Logout/i));

    expect(logoutMock).toHaveBeenCalled();
  });
});
