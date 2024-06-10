import { render, screen } from "@testing-library/react";
import Page from "./Page";

describe("Page Component", () => {
  test("renders the title and children correctly", () => {
    render(<Page title="Test Title">Test Content</Page>);

    expect(
      screen.getByRole("heading", { name: /test title/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});
