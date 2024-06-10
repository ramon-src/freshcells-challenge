import { Layout, Typography } from "antd";
import { theme } from "antd/lib";
import React from "react";

const { Content } = Layout;
const { Title } = Typography;

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ backgroundColor: colorBgContainer }}>
      <Title level={1}>{title}</Title>
      <Content>{children}</Content>
    </Layout>
  );
};

export default Page;
