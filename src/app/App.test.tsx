import { render, screen } from "@testing-library/react";
import App from "./App";

test("render the app", () => {
  render(<App />);
  const loggedScreen = screen.getByText(/My Account/i);
  expect(loggedScreen).toBeInTheDocument();
});
