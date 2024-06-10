import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../services/auth/auth-provider";
import ProtectedRoute from "./ProtectedRoute";

jest.mock("../../../services/auth/auth-provider", () => ({
  useAuth: jest.fn(),
}));

const MockComponent = () => <div>Protected Content</div>;
const MockAuthPage = () => <div>Auth Page</div>;

describe("ProtectedRoute", () => {
  test("renders the protected component if the user is authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={<ProtectedRoute element={<MockComponent />} />}
          />
          <Route path="/auth" element={<MockAuthPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to the auth page if the user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={<ProtectedRoute element={<MockComponent />} />}
          />
          <Route path="/auth" element={<MockAuthPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });
});
