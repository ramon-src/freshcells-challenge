import { render, screen } from "@testing-library/react";
import AuthWrapper from "./AuthWrapper";

test("renders learn react link", () => {
  render(<AuthWrapper />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
