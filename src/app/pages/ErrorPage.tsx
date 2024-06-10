import { Button, Layout, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";

const { Title, Paragraph } = Typography;

const ErrorPage: React.FC = () => {
  return (
    <Layout style={styles.layout}>
      <Content style={styles.content}>
        <div>
          <Title level={1}>Oops!</Title>
          <Paragraph>Sorry, this page doesn't exist.</Paragraph>
          <Button
            type="primary"
            onClick={() => window.location.assign(window.location.origin)}
          >
            Go home
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

const styles = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ErrorPage;
