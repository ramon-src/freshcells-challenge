import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders with MenuOutlined icon when collapsed is true", () => {
    const setCollapsedMock = jest.fn();
    render(<Header collapsed={true} setCollapsed={setCollapsedMock} />);

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  test("renders with CloseOutlined icon when collapsed is false", () => {
    const setCollapsedMock = jest.fn();
    render(<Header collapsed={false} setCollapsed={setCollapsedMock} />);

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  test("clicking on the button toggles the collapsed state", () => {
    const setCollapsedMock = jest.fn();
    render(<Header collapsed={true} setCollapsed={setCollapsedMock} />);
    const button = screen.getByRole("button");
    button.click();
    expect(setCollapsedMock).toHaveBeenCalledWith(false);
  });
});
