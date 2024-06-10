import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Menu } from "antd/lib";
import Sider from "antd/lib/layout/Sider";

type SidebarProps = {
  collapsed?: boolean;
};
const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <Sider
      data-testid="sidebar-menu"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "My Account",
          },
        ]}
      />
    </Sider>
  );
};
export default Sidebar;
