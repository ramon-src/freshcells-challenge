import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Card, Form, Input, Layout } from "antd/lib";
import Button from "antd/lib/button";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/auth-provider";

type FieldType = {
  email: string;
  password: string;
};

function AuthPage(): React.ReactElement {
  const { isAuthenticated, login, isAuthenticating } = useAuth();
  const [loading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const onSubmit = async (values: FieldType) => {
    setSubmitLoading(true);
    await login(values.email, values.password);
    setSubmitLoading(false);
  };

  if (!isAuthenticating && isAuthenticated) {
    navigate("/");
  }

  return (
    <Layout style={styles.authPage}>
      <Card
        title="FreshCells Login"
        style={{
          width: screens.xs ? "90%" : "400px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
            validateTrigger="onChange"
          >
            <Input placeholder="Input your email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Input your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
interface Styles {
  [key: string]: React.CSSProperties;
}
const styles: Styles = {
  authPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AuthPage;
