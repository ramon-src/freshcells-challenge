import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../../services/auth/auth-provider";
import AuthPage from "./AuthPage";

jest.mock("../../../services/auth/auth-provider", () => ({
  useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AuthPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      isAuthenticating: false,
    });

    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/FreshCells Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("validates form inputs and submits the form", async () => {
    const loginMock = jest.fn().mockResolvedValue(undefined);
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      isAuthenticating: false,
    });

    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("test@example.com", "password");
    });
  });

  test("navigates to home page if authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: jest.fn(),
      isAuthenticating: false,
    });

    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
