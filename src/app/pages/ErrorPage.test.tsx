import { fireEvent, render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  test("renders correctly", () => {
    render(<ErrorPage />);

    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, this page doesn't exist./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Go home/i })
    ).toBeInTheDocument();
  });

  test("go home button redirects to home", () => {
    const assignMock = jest.fn();
    // @ts-ignore
    delete window.location;
    window.location = { assign: assignMock } as any;

    render(<ErrorPage />);

    fireEvent.click(screen.getByRole("button", { name: /Go home/i }));
    expect(assignMock).toHaveBeenCalledWith(window.location.origin);
  });
});
