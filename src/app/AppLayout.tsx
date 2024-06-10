import { Layout, theme } from "antd/lib";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
const { Content } = Layout;

const AppLayout = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const screens = useBreakpoint();
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />

      <Layout style={{ minHeight: "100vh" }}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: screens.xs ? "0px" : "48px 48px",
            padding: screens.xs ? 26 : 48,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
