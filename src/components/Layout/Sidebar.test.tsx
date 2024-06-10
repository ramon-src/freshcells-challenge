import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar Component", () => {
  test("renders with 'My Account' menu item", () => {
    render(<Sidebar collapsed={false} />);

    const menuItem = screen.getByText(/my account/i);
    expect(menuItem).toBeInTheDocument();

    const menuIcon = screen.getByRole("img", { name: /user/i });
    expect(menuIcon).toBeInTheDocument();
  });

  test("renders in collapsed state", () => {
    render(<Sidebar collapsed={true} />);

    const menu = screen.getByTestId("sidebar-menu");

    expect(menu.classList.contains("ant-layout-sider-collapsed")).toBe(true);
  });

  test("renders in expanded state", () => {
    render(<Sidebar collapsed={false} />);

    const menu = screen.getByTestId("sidebar-menu");

    expect(menu.classList.contains("ant-layout-sider-collapsed")).toBe(false);
  });
});
