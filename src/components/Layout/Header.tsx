import { CloseOutlined, MenuOutlined } from "@ant-design/icons/lib/icons";
import { Button, Layout, theme } from "antd/lib";
const { Header: AntdHeader } = Layout;

type HeaderProps = {
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
};
const Header: React.FC<HeaderProps> = ({ collapsed = true, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntdHeader style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </AntdHeader>
  );
};
export default Header;
